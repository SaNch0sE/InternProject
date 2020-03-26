const UserModel = require('./model');

/**
 * @exports
 * @method findAll
 * @param {}
 * @summary get list of all users
 * @returns Promise<UserModel[]>
 */
function findAll() {
    return UserModel.find({}).exec();
}

/**
 * @exports
 * @method findById
 * @param {string} id
 * @summary get a user
 * @returns {Promise<UserModel>}
 */
function findById(id) {
    return UserModel.findById(id).exec();
}

/**
 * @exports
 * @method create
 * @param {object} profile
 * @summary create a new user
 * @returns {Promise<UserModel>}
 */
function create(profile) {
    return UserModel.create(profile);
}

/**
 * Find a user by id and update his profile
 * @exports
 * @method updateById
 * @param {string} _id
 * @param {object} fullName(new)
 * @summary update a user's profile
 * @returns {Promise<void>}
 */
function updateById(_id, fullName) {
    return UserModel.updateOne({ _id }, { fullName }).exec();
}

/**
 * @exports
 * @method deleteById
 * @param {string} _id
 * @summary delete a user from database
 * @returns {Promise<void>}
 */
function deleteById(_id) {
    return UserModel.deleteOne({ _id }).exec();
}

/**
 * @exports
 * @method multiply
 * @param {a} number
 * @param {b} number
 * @returns {Number}
 */
function multiply(a, b) {
    return a + b;
}

module.exports = {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
    multiply,
};
