const modelService = require('../services/modelService');
const carService = require('../services/carService');

module.exports = () => (req, res, next) => {
    req.storage = Object.assign({}, modelService, carService);
    next();
};