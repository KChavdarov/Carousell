const Model = require('../models/Model');

module.exports = {
    getAll,
    getAllMakes,
    getModelsByMake,
};

function getAllMakes() {
    const makes = Model.find().distinct('make');
    return makes;
}

function getModelsByMake(make) {
    const result = Model.aggregate()
        .unwind('bodyStyles')
        .match({ make })
        .group({ _id: '$model', bodyTypes: { $addToSet: '$bodyStyles' } });
    return result;
}

function getAll() {
    const models = Model.find();
    return models;
}