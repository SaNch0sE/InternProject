const jwt = require('./auth');
const Service = require('./service');
const UserValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');

const refreshTime = { cookie: 24 * 60 * 60 * 1000, jwt: '24h' };
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
            const session = await Service.checkSession(verified.data.login, req.cookies.refresh);
            if (session === true) {
                const options = { maxAge: accessTime.cookie, httpOnly: true };
                res.cookie('access', jwt.getToken(verified.data.email, accessTime.jwt), options);
                console.log('Access-token refreshed\n');
                return res.redirect(307, '/');
            }
        }
        return res.status(400).json({
            message: 'Auth error',
            details: 'Please login first',
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
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
            const session = await Service.checkSession(verified.data.login, req.cookies.refresh);
            if (session === true) {
                const options = { maxAge: accessTime.cookie, httpOnly: true };
                res.cookie('access', jwt.getToken(verified.data.email, accessTime.jwt), options);
                console.log('Access-token refreshed\n');
                return res.redirect(307, '/:id');
            }
        }
        return res.status(400).json({
            message: 'Auth error',
            details: 'Please login first',
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                error: error.name,
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
            const session = await Service.checkSession(verified.data.login, req.cookies.refresh);
            if (session === true) {
                const options = { maxAge: accessTime.cookie, httpOnly: true };
                res.cookie('access', jwt.getToken(verified.data.email, accessTime.jwt), options);
                console.log('Access-token refreshed\n');
                return res.redirect(307, '/');
            }
        }
        return res.status(400).json({
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
            const updatedUser = await Service.updateById(req.body.id, req.body);
            return res.status(200).json({
                data: updatedUser,
            });
        }
        if (verified.status === 1) {
            const session = await Service.checkSession(verified.data.login, req.cookies.refresh);
            if (session === true) {
                const options = { maxAge: accessTime.cookie, httpOnly: true };
                res.cookie('access', jwt.getToken(verified.data.email, accessTime.jwt), options);
                console.log('Access-token refreshed\n');
                return res.redirect(307, '/');
            }
        }
        return res.status(400).json({
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
            return res.status(200).json({
                data: deletedUser,
            });
        }
        if (verified.status === 1) {
            const session = await Service.checkSession(verified.data.login, req.cookies.refresh);
            if (session === true) {
                const options = { maxAge: accessTime.cookie, httpOnly: true };
                res.cookie('access', jwt.getToken(verified.data.email, accessTime.jwt), options);
                console.log('Access-token refreshed\n');
                return res.redirect(307, '/');
            }
        }
        return res.status(400).json({
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
async function signUp(req, res, next) {
    try {
        const { error } = UserValidation.signUp(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }
        const admin = {
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password,
            session: 'logged out',
        };
        const newAdmin = await Service.signUp(admin);
        return res.status(200).json({
            data: newAdmin,
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
async function signIn(req, res, next) {
    try {
        const { error } = UserValidation.signIn(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const data = { email: req.body.email, password: req.body.password };
        const refresh = jwt.getToken({ email: req.body.email }, refreshTime.jwt);

        const updatedUser = await Service.signIn(data, refresh);

        if (updatedUser.nModified === 1) {
            const access = jwt.getToken({ email: req.body.email }, accessTime.jwt);
            res.cookie('access', access, { maxAge: accessTime.cookie, httpOnly: true });
            res.cookie('refresh', refresh, { maxAge: refreshTime.cookie, httpOnly: true });
            return res.status(200).json({
                updatedUser,
            });
        }
        return res.status(200).json({
            message: 'Auth error',
            details: 'Email or password is invalid',
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
async function logout(req, res, next) {
    try {
        const verified = jwt.verify(req.cookies);
        if (verified.status === 0) {
            const done = await Service.logout(verified.data.email, req.cookies.refresh);
            return res.status(200).json({
                data: done,
            });
        }
        if (verified.status === 1) {
            const options = { maxAge: accessTime.cookie, httpOnly: true };
            res.cookie('access', jwt.getToken(verified.data.email, accessTime.jwt), options);
            console.log('Access-token refreshed\n');
            return res.redirect(307, '/logout');
        }
        return res.status(400).json({
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
    signUp,
    signIn,
    logout,
};
