const jwt = require('../auth');
const Service = require('./service');
const UserValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');

const accessTime = { cookie: 3 * 60 * 1000, jwt: '3m' };

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findAll(req, res, next) {
    try {
        const verified = jwt.verify(req.cookies);
        if (verified.status === 0) {
            const users = await Service.findAll();
            return res.status(200).json({
                data: users,
            });
        }
        if (verified.status === 1) {
            const session = await Service.checkSession(
                { email: verified.email }.login,
                req.cookies.refresh,
            );
            if (session === true) {
                const options = { maxAge: accessTime.cookie, httpOnly: true };
                const newt = jwt.getToken({ email: verified.email }, accessTime.jwt);
                res.cookie('access', newt, options);
                return res.redirect(308, '/');
            }
        }
        return res.status(401).json({
            message: 'Auth error',
            details: 'Please login first',
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            details: null,
        });

        return next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findById(req, res, next) {
    try {
        const { error } = UserValidation.findById(req.params);

        if (error) {
            throw new ValidationError(error.details);
        }
        const verified = jwt.verify(req.cookies);
        if (verified.status === 0) {
            const user = await Service.findById(req.params.id);
            return res.status(200).json({
                data: user,
            });
        }
        if (verified.status === 1) {
            const session = await Service.checkSession(
                { email: verified.email }.login,
                req.cookies.refresh,
            );
            if (session === true) {
                const options = { maxAge: accessTime.cookie, httpOnly: true };
                const newt = jwt.getToken({ email: verified.email }, accessTime.jwt);
                res.cookie('access', newt, options);
                return res.redirect(308, '/:id');
            }
        }
        return res.status(401).json({
            message: 'Auth error',
            details: 'Please login first',
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                message: error.name,
                details: error.message,
            });
        }

        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
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
        const user = {
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password,
        };
        const verified = jwt.verify(req.cookies);
        if (verified.status === 0) {
            const newUser = await Service.create(user);
            return res.status(200).json({
                data: newUser,
            });
        }
        if (verified.status === 1) {
            const session = await Service.checkSession(
                { email: verified.email }.login,
                req.cookies.refresh,
            );
            if (session === true) {
                const options = { maxAge: accessTime.cookie, httpOnly: true };
                const newt = jwt.getToken({ email: verified.email }, accessTime.jwt);
                res.cookie('access', newt, options);
                return res.redirect(308, '/');
            }
        }
        return res.status(401).json({
            message: 'Auth error',
            details: 'Please login first',
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                message: error.name,
                details: error.message,
            });
        }

        res.status(500).json({
            message: error.name,
            details: error.message,
        });

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
        const verified = jwt.verify(req.cookies);
        if (verified.status === 0) {
            const updatedUser = await Service.updateById(req.body.id, req.body.fullName);
            if (updatedUser.nModified === 1) {
                return res.status(200).json({
                    data: { updated: true },
                });
            }
            return res.status(200).json({
                data: { updated: false },
            });
        }
        if (verified.status === 1) {
            const session = await Service.checkSession(
                { email: verified.email }.login,
                req.cookies.refresh,
            );
            if (session === true) {
                const options = { maxAge: accessTime.cookie, httpOnly: true };
                const newt = jwt.getToken({ email: verified.email }, accessTime.jwt);
                res.cookie('access', newt, options);
                return res.redirect(308, '/');
            }
        }
        return res.status(401).json({
            message: 'Auth error',
            details: 'Please login first',
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                message: error.name,
                details: error.message,
            });
        }

        res.status(500).json({
            message: error.name,
            details: error.message,
        });

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
        const verified = jwt.verify(req.cookies);
        if (verified.status === 0) {
            const deletedUser = await Service.deleteById(req.body.id);
            if (deletedUser.deletedCount === 1) {
                return res.status(200).json({
                    data: { deleted: true },
                });
            }
            return res.status(200).json({
                data: { deleted: false, details: deletedUser },
            });
        }
        if (verified.status === 1) {
            const session = await Service.checkSession(
                { email: verified.email }.login,
                req.cookies.refresh,
            );
            if (session === true) {
                const options = { maxAge: accessTime.cookie, httpOnly: true };
                const newt = jwt.getToken({ email: verified.email }, accessTime.jwt);
                res.cookie('access', newt, options);
                return res.redirect(308, '/');
            }
        }
        return res.status(401).json({
            message: 'Auth error',
            details: 'Please login first',
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                message: error.name,
                details: error.message,
            });
        }

        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
}

module.exports = {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
};
