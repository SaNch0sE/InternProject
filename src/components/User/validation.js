const Validation = require('../validation');

/**
 * @exports
 * @class
 * @extends Validation
 */
class UserValidation extends Validation {
    /**
     * @param {String} data.id - objectId
     * @returns
     * @memberof UserValidation
     */
    findById(data) {
        return this.Joi
            .object({
                id: this.Joi.objectId(),
            })
            .validate(data);
    }

    /**
     * @param {String} profile.email
     * @param {String} profile.fullName
     * @returns
     * @memberof UserValidation
     */
    create(profile) {
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
            .validate(profile);
    }

    /**
     * @param {String} data.id - objectId
     * @param {String} data.fullName
     * @returns
     * @memberof UserValidation
     */
    updateById(data) {
        return this.Joi
            .object({
                id: this.Joi.objectId(),
                fullName: this.Joi
                    .string()
                    .min(1)
                    .max(30)
                    .required(),
            })
            .validate(data);
    }

    /**
     * @param {String} data.id - objectId
     * @returns
     * @memberof UserValidation
     */
    deleteById(data) {
        return this.Joi
            .object({
                id: this.Joi.objectId(),
            })
            .validate(data);
    }

    /**
     * @param {String} data.id - objectId
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

module.exports = new UserValidation();
