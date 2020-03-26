const AdminModel = require('./model');

/**
 * @exports
 * @method create
 * @param {object} profile
 * @summary create a new user
 * @returns {Promise<UserModel>}
 */
function signUp(profile) {
    return AdminModel.create(profile);
}

/**
 * @exports
 * @method signIn
 * @param {string} email
 * @param {string} token
 * @summary delete a user from database
 * @returns {Promise<void>}
 */
function signIn(profile, session) {
    return AdminModel.updateOne(profile, { session }).exec();
}

/**
 * @exports
 * @method logout
 * @param {string} email
 * @summary delete a user from database
 * @returns {Promise<void>}
 */
function logout(email, session) {
    return AdminModel.updateOne({ email, session }, { session: 'logged out' }).exec();
}

module.exports = {
    signUp,
    signIn,
    logout,
};
