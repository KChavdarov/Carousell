const modelService = require('../services/modelService');

module.exports = () => (req, res, next) => {
    req.storage = Object.assign({}, modelService);
    next();
};