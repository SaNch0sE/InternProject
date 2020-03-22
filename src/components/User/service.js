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
 * @param {object} newProfile
 * @summary update a user's profile
 * @returns {Promise<void>}
 */
function updateById(_id, newProfile) {
    return UserModel.updateOne({ _id }, newProfile).exec();
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

/**
 * @exports
 * @method signIn
 * @param {string} email
 * @param {string} token
 * @summary delete a user from database
 * @returns {Promise<void>}
 */
function signIn(profile, token) {
    return UserModel.updateOne(profile, { token }).exec();
}

/**
 * @exports
 * @method logout
 * @param {string} email
 * @summary delete a user from database
 * @returns {Promise<void>}
 */
function logout(email, token) {
    return UserModel.updateOne({ email, token }, { token: 'ntoken' }).exec();
}

module.exports = {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
    multiply,
    signIn,
    logout,
};
