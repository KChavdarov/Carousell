const Model = require('../models/Model');

module.exports = {
    getAll,
    getAllMakes,
    getModelsByMake,
    getAllBodyStyles,
};

function getAllMakes() {
    const makes = Model.find().distinct('make');
    return makes;
}

function getAllBodyStyles() {
    const bodyStyles = Model.aggregate()
        .unwind('bodyStyles')
        .match({})
        .group({ _id: null, bodyStyles: { $addToSet: '$bodyStyles' } });
    return bodyStyles;
}

function getModelsByMake(make) {
    const result = Model.aggregate()
        .unwind('bodyStyles')
        .match({ make: { $regex: new RegExp(`^${make}$`, 'i') } })
        .group({ _id: '$model', bodyStyles: { $addToSet: '$bodyStyles' } })
        .project('bodyStyles');
    return result;
}

function getAll() {
    const models = Model.find();
    return models;
}