const router = require('express').Router();
const { parseErrorMessage } = require('../util/parser');

router.get('/makes', async (req, res) => {
    try {
        const makes = await req.storage.getAllMakes();
        res.status(200).json(makes.sort((a, b) => (a + '').localeCompare(b + '')));
    } catch (error) {
        const errors = parseErrorMessage(error);
        res.status(400).json({ message: errors });
    }
});

router.get('/:make', async (req, res) => {
    try {
        const make = req.params.make;
        const models = await req.storage.getModelsByMake(make);
        res.status(200).json(models.sort((a, b) => (a['_id'] + '').localeCompare(b['_id'] + '')));
    } catch (error) {
        const errors = parseErrorMessage(error);
        res.status(400).json({ message: errors });
    }
});

module.exports = router;