require('dotenv').config();
const jwt = require('jsonwebtoken');

/**
 * @function
 * @param {Object} data payload
 * @param {String} time time to expire
 * @returns {Promise<void>}
 */
function getToken(data, time) {
    return jwt.sign(data, process.env.KEY, { expiresIn: time });
}

/**
 * @function
 * @param {express.Response.cookies} tokens
 * @returns {Promise<void>}
 */
function verify(tokens) {
    try {
        const refresh = jwt.verify(tokens.refresh, process.env.KEY);
        try {
            const access = jwt.verify(tokens.access, process.env.KEY);
            if (access && refresh) {
                // code "0" - OK, "1" - Access-token expired, "2" - All tokens expired
                return { status: 0, email: access.email };
            }
        // if user has no access token but has refresh
        } catch (err) {
            // console.log(`Error: ${err}`);
            return { status: 1, email: refresh.email };
        }
    // else
    } catch (err) {
        // console.log(`Error: ${err}`);
        return { status: 2 };
    }
    return true;
}

module.exports = {
    getToken,
    verify,
};
