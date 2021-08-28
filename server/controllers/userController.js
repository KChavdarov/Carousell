const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { COOKIE_NAME } = require('../config');
const { isGuest, isAuth } = require('../middleware/guards');
const { parseErrorMessage } = require('../util/parser.js');
const { createToken } = require('../util/jwt.js');
const sanitizeUserData = require('../util/sanitize.js');

router.post('/register', isGuest(),
    body('firstName', 'Please enter your first name!').trim().notEmpty(),
    body('lastName', 'Please enter your last name!').trim().notEmpty(),
    body('email', 'Please enter a valid email!').trim().isEmail().notEmpty().normalizeEmail(),
    body('phone', 'Please enter a valid Bulgarian phone number!').matches(/^\+359\d{9}$/),
    body('password', 'Password must be at least 3 characters long!').trim().isLength({ min: 3 }),
    async (req, res) => {
        try {
            const errors = Object.values(validationResult(req).mapped());
            if (errors.length > 0) {
                throw new Error(errors.map(error => error.msg).join('\n'));
            } else {
                const { firstName, lastName, email, phone, password } = req.body;
                const user = await req.auth.register({ firstName, lastName, email, phone, password });
                const token = createToken({ _id: user._id, email: user.email });
                res.cookie(COOKIE_NAME, token, { httpOnly: true });
                res.status(201).json(sanitizeUserData(user));
            }
        } catch (error) {
            console.log(error);
            const errors = parseErrorMessage(error);
            res.status(406).json({ message: errors });
        }
    }
);

router.post('/login', isGuest(), async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await req.auth.login({ email, password });
        const token = createToken({ _id: user._id, email: user.email });
        res.cookie(COOKIE_NAME, token);
        res.status(200).json(sanitizeUserData(user));
    } catch (error) {
        console.log(error);
        const errors = parseErrorMessage(error);
        res.status(406).json({ message: errors });
    }
});

router.get('/verify', async (req, res) => {
    try {
        if (req.user) {
            const user = await req.auth.verifyUser(req.user._id);
            res.status(200).json(sanitizeUserData(user));
        } else {
            res.status(204).end();
        }
    } catch (error) {
        console.log(error);
        const errors = parseErrorMessage(error);
        res.status(400).json({ message: errors });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.status(204).send({ message: 'Logged out' });
});

router.get('/bookmark/:id', isAuth(), async (req, res) => {
    let userId = req.user._id;
    let carId = req.params.id;
    try {
        const [user, car] = await Promise.all([
            req.auth.likeCar(userId, carId),
            req.storage.addSubscriber(userId, carId)
        ]);
        res.status(201).json(sanitizeUserData(user));

    } catch (error) {
        console.log(error);
        const errors = parseErrorMessage(error);
        res.status(400).json({ message: errors });
    }
});

router.delete('/bookmark/:id', isAuth(), async (req, res) => {
    let userId = req.user._id;
    let carId = req.params.id;
    try {
        const [user, car] = await Promise.all([
            req.auth.unlikeCar(userId, carId),
            req.storage.removeSubscriber(userId, carId)
        ]);
        res.status(201).json(sanitizeUserData(user));

    } catch (error) {
        console.log(error);
        const errors = parseErrorMessage(error);
        res.status(400).json({ message: errors });
    }
});

module.exports = router;