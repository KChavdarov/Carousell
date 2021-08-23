const { isAuth } = require('../middleware/guards');
const { uploadImage } = require('../util/cloudinary');
const { parseForm } = require('../util/parseForm');
const { parseErrorMessage } = require('../util/parser');



const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        
    } catch (error) {
        
    }
});

router.post('/create', isAuth(), async (req, res) => {
    try {
        const userId = req.user._id;
        const images = [];
        let [data, files] = await parseForm(req);

        for (const file of files) {
            if (file.type == 'image/jpeg' || file.type == 'image/png') {
                const image = await uploadImage(file.path);
                const url = image.url;
                console.log(image);
                images.push(url);
            }
        }

        if (images.length == 0) {
            throw new Error('Please upload at least one image!');
        }

        data.images = images;
        data.owner = userId;
        const car = await req.storage.createCar(data);
        res.status(201).json(car);
    } catch (error) {
        const errors = parseErrorMessage(error);
        res.status(400).json({ message: errors });
    }
});

module.exports = router;