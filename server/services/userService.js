const User = require('../models/User');

module.exports = {
    getUserByEmail,
    getUserById,
    createUser,
    editUser,
};

async function getUserById(id) {
    return User.findById(id);
};

async function getUserByEmail(email) {
    return User.findOne({ email });
};

async function createUser(data) {
    const user = new User(data);
    return user.save();
};


//TODO:
async function editUser(id, data) {
    const user = User.findById(id);
    Object.assign(user, data);
    return user.save();
};