const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../config/index.js');
const { getUserByEmail, createUser, getUserById, likeCar, unlikeCar, publishCar, unpublishCar, } = require('../services/userService.js');

module.exports = () => {
    return (req, res, next) => {
        req.auth = {
            register,
            login,
            verifyUser,
            likeCar,
            unlikeCar,
            publishCar,
            unpublishCar,
        };
        next();
    };
};

async function verifyUser(id) {
    return getUserById(id);
}

async function register(data) {

    // TODO: CHECK IF PHONE IS IN USE

    const existing = await getUserByEmail(data.email);
    if (existing) {
        throw new Error('Email already in use!');
    } else {
        const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
        data.password = hashedPassword;
        const user = await createUser(data);
        return user;
    }
}

async function login(data) {
    console.log(data);
    const user = await getUserByEmail(data.email);
    if (user) {
        const isMatch = await bcrypt.compare(data.password, user.password);
        if (isMatch) {
            return user;
        } else {
            throw new Error('Wrong email or password!');
        }
    } else {
        throw new Error('Wrong email or password!');
    }
}