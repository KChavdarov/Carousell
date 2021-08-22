const environment = 'development';

const config = {
    development: {
        PORT: 3000,
        DB_CONNECTION_STRING: 'mongodb://localhost:27017/carousell',
        COOKIE_NAME: 'X-Authorization',
        TOKEN_SECRET: 'proper secret 123',
        SALT_ROUNDS: 10,
        CORS: {
            origin: ['http://localhost:4200'],
            credentials: true
        },
        CLOUDINARY: {}
    },
    production: {},
};

module.exports = config[environment];