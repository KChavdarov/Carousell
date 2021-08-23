const router = require('express').Router();
const userController = require('../controllers/userController');
const carsController = require('../controllers/carsController');

router.use('/user', userController);
router.use('/cars', carsController);

module.exports = router;