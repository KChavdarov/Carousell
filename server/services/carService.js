const Car = require('../models/Car');

module.exports = {
    createCar,
    searchCar,
    getCarById,
    addSubscriber,
    removeSubscriber,
};

async function getCarById(id) {
    return Car.findById(id);
}

async function addSubscriber(userId, carId) {
    const car = await getCarById(carId);
    if (car) {
        car.subscribers.push(userId);
        return car.save();
    } else {
        return car;
    }
}

async function removeSubscriber(userId, carId) {
    const car = await getCarById(carId);
    if (car) {
        let subscribers = car.subscribers.filter(subId => subId != userId);
        Object.assign(car, { subscribers });
        return car.save();
    } else {
        return car;
    }
}

async function searchCar(data) {
    let { make, model, color, bodyStyle, price, year, location, power, engine, mileage, transmission, safety, comfort, others, perPage = 12, page = 1 } = data;
    const query = { price: { $gte: 0 }, isDeleted: false };
    if (make) { query.make = make; };
    if (model) { query.model = model; };
    if (color) { query.color = color; };
    if (bodyStyle) { query.bodyStyle = bodyStyle; };
    if (year) { query.year = { $gte: year }; };
    if (location) { query.location = location; };
    if (power) { query.power = { $gte: power }; };
    if (engine) { query.engine = engine; };
    if (mileage) { query.mileage = { $lte: mileage }; };
    if (transmission) { query.transmission = transmission; };
    Object.entries(safety).filter(([k, v]) => v).forEach(([k, v]) => { query[`safety.${k}`] = true; });
    Object.entries(comfort).filter(([k, v]) => v).forEach(([k, v]) => { query[`comfort.${k}`] = true; });
    Object.entries(others).filter(([k, v]) => v).forEach(([k, v]) => { query[`others.${k}`] = true; });
    Object.entries(price).filter(([k, v]) => v).forEach(([k, v]) => { if (k == 'min') { query.price.$gte = Number(v); } else if (k == 'max') { query.price.$lte = Number(v); } });

    const cars = await Car.find(query)
        .skip(Number(perPage) * (Number(page) - 1))
        .limit(Number(perPage));

    const count = await Car.countDocuments(query);

    const result = {
        page,
        perPage,
        count,
        cars,
    };

    return result;
}

async function createCar(data) {
    const car = new Car(data);
    return car.save();
}