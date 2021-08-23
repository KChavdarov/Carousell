const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }],
    cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }],
    comments: {
        type: Array
    },
    replies: {
        type: Array
    },
    isAdmin: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

});

const User = mongoose.model('User', userSchema);

module.exports = User;

// PRODUCTS: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Shoe'
// }],