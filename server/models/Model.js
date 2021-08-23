const { model, Schema } = require('mongoose');

const modelSchema = new Schema({
    year: Number,
    make: String,
    model: String,
    bodyStyles: Array
});

const Model = model('Model', modelSchema);
module.exports = Model;