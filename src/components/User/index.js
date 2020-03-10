const UserService = require('./service');
const UserValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findAll(req, res, next) {
    try {
        const users = await UserService.findAll();

        const csrf = req.csrfToken();

        let error = req.flash('error')[0];
        if (error !== undefined) {
            error = error.message;
        } else {
            error = false;
        }

        res.render('index', { users, error, csrf });
    } catch (error) {
        req.flash('error', error.message);
        res.redirect('/v1/users');
        next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function create(req, res, next) {
    try {
        const { error } = UserValidation.create(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        await UserService.create(req.body);

        return res.status(200).redirect('/v1/users');
    } catch (error) {
        if (error instanceof ValidationError) {
            req.flash('error', error.message);
            return res.redirect('/v1/users');
        }

        req.flash('error', `${error.name}\n${error.message}`);
        res.redirect('/v1/users');

        return next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function updateById(req, res, next) {
    try {
        const { error } = UserValidation.updateById(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        await UserService.updateById(req.body.id, req.body);

        return res.status(200).redirect('/v1/users');
    } catch (error) {
        if (error instanceof ValidationError) {
            req.flash('error', error.message);
            return res.redirect('/v1/users');
        }

        req.flash('error', `${error.name}\n${error.message}`);
        res.redirect('/v1/users');

        return next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function deleteById(req, res, next) {
    try {
        const { error } = UserValidation.deleteById(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        await UserService.deleteById(req.body.id);

        return res.status(200).redirect('/v1/users');
    } catch (error) {
        if (error instanceof ValidationError) {
            req.flash('error', error.message);
            return res.redirect('/v1/users');
        }

        req.flash('error', `${error.name}\n${error.message}`);
        res.redirect('/v1/users');

        return next(error);
    }
}

module.exports = {
    findAll,
    create,
    updateById,
    deleteById,
};
