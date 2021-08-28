function preLoad() {
    return async (req, res, next) => {
        try {
            const carId = req.params.id;
            const car = await req.storage.getCarById(carId);
            req.data = car;
            next();
        } catch {
            res.status(404).json({ message: 'Something went wrong, Please try again' });
        }
    };
}

module.exports = {preLoad};