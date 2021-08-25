const router = require('express').Router();
const userController = require('../controllers/userController');
const carsController = require('../controllers/carsController');
const modelsController = require('../controllers/modelsController');

router.use('/user', userController);
router.use('/cars', carsController);
router.use('/models', modelsController);

module.exports = router;