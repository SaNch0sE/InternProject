const Validation = require('../validation');

/**
 * @exports
 * @class
 * @extends Validation
 */
class AuthValidation extends Validation {
    /**
     * @param {String} data.email - Email
     * @param {String} data.fullName - Full name
     * @param {String} data.password - Password
     * @param {String} data.repeat_password - Repeated password
     * @returns
     * @memberof UserValidation
     */
    signUp(data) {
        return this.Joi
            .object({
                email: this.Joi.string().email().required(),
                fullName: this.Joi
                    .string()
                    .min(1)
                    .max(30)
                    .required(),
                password: this.Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,32}$')).required(),
                repeat_password: this.Joi.ref('password'),
            })
            .validate(data);
    }

    /**
     * @param {String} data.email - Email
     * @param {String} data.password - password
     * @returns
     * @memberof UserValidation
     */
    signIn(data) {
        return this.Joi
            .object({
                email: this.Joi.string().email().required(),
                password: this.Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,32}$')).required(),
            })
            .validate(data);
    }
}

module.exports = new AuthValidation();
