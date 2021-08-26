const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    title: { type: String },
    make: { type: String },
    model: { type: String },
    year: { type: Number },
    bodyStyle: { type: String },
    description: { type: String },
    location: { type: String },
    engine: { type: String },
    transmission: { type: String },
    power: { type: Number },
    color: { type: String },
    mileage: { type: Number },
    price: { type: Number },
    comfort: { type: {} },
    safety: { type: {} },
    others: { type: {} },
    images: { type: [] },
    views: { type: [] },
    subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: { type: [] },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false },
});

const Car = mongoose.model('Car', carSchema);
module.exports = Car;