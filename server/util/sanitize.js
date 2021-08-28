module.exports = function sanitizeUserData(user) {
    const { _id, firstName, lastName, email, phone, createdAt, updatedAt, cars, favorites } = user;
    return { _id, firstName, lastName, email, phone, createdAt, updatedAt, cars, favorites };
};