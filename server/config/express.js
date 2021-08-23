const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { CORS } = require('./index');
const logger = require('../middleware/logger');
const router = require('./router');
const parseToken = require('../middleware/parseToken');
const auth = require('../middleware/auth');
const storage = require('../middleware/storage');

module.exports = (app) => {
    app.use(cors(CORS));
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(logger());

    app.use(parseToken());
    app.use(auth());
    app.use(storage());

    app.use('/api', router);
    app.get('/', (req, res) => res.send('API access available at endpoint \'/api\''));

};