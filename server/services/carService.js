const Car = require('../models/Car');

module.exports = {
    createCar,
    
};

async function createCar(data) {
    const car = new Car(data);
    return car.save();
}