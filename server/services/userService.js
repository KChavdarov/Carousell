const User = require('../models/User');

module.exports = {
    getUserByEmail,
    getUserById,
    createUser,
    editUser,
    likeCar,
    unlikeCar,
    publishCar,
    unpublishCar,
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

async function publishCar(userId, carId) {
    const user = await getUserById(userId);
    if (user) {
        user.cars.push(carId);
        return user.save();
    } else {
        return user;
    }
}

async function unpublishCar(userId, carId) {
    const user = await getUserById(userId);
    if (user) {
        let cars = user.cars.filter(favoriteId => favoriteId != carId);
        Object.assign(user, { cars });
        return user.save();
    } else {
        return user;
    }
}

async function likeCar(userId, carId) {
    const user = await getUserById(userId);
    if (user) {
        user.favorites.push(carId);
        return user.save();
    } else {
        return user;
    }
}

async function unlikeCar(userId, carId) {
    const user = await getUserById(userId);
    if (user) {
        let favorites = user.favorites.filter(favoriteId => favoriteId != carId);
        Object.assign(user, { favorites });
        return user.save();
    } else {
        return user;
    }
}

//TODO:
async function editUser(id, data) {
    const user = User.findById(id);
    Object.assign(user, data);
    return user.save();
};