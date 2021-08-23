const router = require('express').Router();
const userController = require('../controllers/userController');

router.use('/user', userController);
router.post('/test', (req, res) => {
    res.cookie('test', '123');
    res.status(201).end();
});

module.exports = router;