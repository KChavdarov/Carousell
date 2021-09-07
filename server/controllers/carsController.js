const { isAuth, isOwner } = require('../middleware/guards');
const { uploadImage } = require('../util/cloudinary');
const { parseForm } = require('../util/parseForm');
const { parseErrorMessage } = require('../util/parser');
const { sanitizeUserData } = require('../util/sanitize.js');
const { preLoad } = require('../util/preload.js');


const router = require('express').Router();

router.get('/latest', async (req, res) => {
    try {
        const cars = await req.storage.getLatest();
        res.status(200).json(cars);

    } catch (error) {
        const errors = parseErrorMessage(error);
        res.status(400).json({ message: errors });
    }
});

router.get('/makes', async (req, res) => {
    try {
        const makes = await req.storage.getAllMakes();
        res.status(200).json(makes);
    } catch (error) {
        const errors = parseErrorMessage(error);
        res.status(400).json({ message: errors });
    }
});

router.get('/details/:id', async (req, res) => {
    const carId = req.params.id;
    try {
        const car = await req.storage.getCarById(carId);
        res.status(200).json(car);
    } catch (error) {
        const errors = parseErrorMessage(error);
        res.status(404).json({ message: errors });
    }
});

router.post('/create', isAuth(), async (req, res) => {
    try {
        const userId = req.user._id;
        const images = [];
        let [data, files] = await parseForm(req);

        for (const file of files) {
            if (file.type == 'image/jpeg' || file.type == 'image/png') {
                const image = await uploadImage(file.path);
                const url = image.url;
                console.log(image);
                images.push(url);
            }
        }

        if (images.length == 0) {
            throw new Error('Please upload at least one image!');
        }

        data.images = images;
        data.owner = userId;
        const car = await req.storage.createCar(data);
        const user = await req.auth.publishCar(userId, car._id);
        res.status(201).json({ car, user: sanitizeUserData(user) });
    } catch (error) {
        const errors = parseErrorMessage(error);
        res.status(400).json({ message: errors });
    }
});

router.put('/:id', preLoad(), isOwner(), async (req, res) => {
    try {
        let [data, files] = await parseForm(req);
        const carId = req.params.id;
        const images = data.images || [];

        for (const file of files) {
            if (file.type == 'image/jpeg' || file.type == 'image/png') {
                const image = await uploadImage(file.path);
                const url = image.url;
                images.push(url);
            }
        }

        if (images.length == 0) {
            throw new Error('Please upload at least one image!');
        }

        data.images = images;
        const car = await req.storage.editCar(carId, data);
        res.status(201).json(car);
    } catch (error) {
        const errors = parseErrorMessage(error);
        res.status(400).json({ message: errors });
    }
});

router.post('/search', async (req, res) => {
    try {
        const result = await req.storage.searchCar(req.body);
        res.status(200).json(result);
    } catch (error) {
        const errors = parseErrorMessage(error);
        res.status(400).json({ message: errors });
    }
});

router.get('/favorites', isAuth(), async (req, res) => {
    const userId = req.user._id;
    try {
        const cars = await req.storage.getFavorites(userId);
        res.status(200).json(cars);

    } catch (error) {
        const errors = parseErrorMessage(error);
        res.status(400).json({ message: errors });
    }
});

router.get('/user', isAuth(), async (req, res) => {
    const userId = req.user._id;
    try {
        const cars = await req.storage.getUserCars(userId);
        res.status(200).json(cars);

    } catch (error) {
        const errors = parseErrorMessage(error);
        res.status(400).json({ message: errors });
    }
});

router.delete('/:id', preLoad(), isOwner(), async (req, res, next) => {
    const userId = req.user._id;
    const carId = req.params.id;
    try {
        const [user, car] = await Promise.all([
            req.auth.unpublishCar(userId, carId),
            req.storage.deleteCar(carId)
        ]);
        res.status(200).json(user);
    } catch (error) {
        const errors = parseErrorMessage(error);
        res.status(400).json({ message: errors });
    }
});

module.exports = router;