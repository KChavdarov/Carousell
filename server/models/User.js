const { Schema, model } = require('mongoose');

const userSchema = new Schema({
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
    favorites: {
        type: Array
    },
    cars: {
        type: Array
    },
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

const User = model('User', userSchema);

module.exports = User;

// PRODUCTS: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Shoe'
// }],