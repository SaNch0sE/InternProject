
const jwt = require('../auth');
const Service = require('./service');
const AuthValidation = require('./validation');
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
async function signUp(req, res, next) {
    try {
        const { error } = AuthValidation.signUp(req.body);

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
            data: {
                _id: newAdmin._id,
                email: newAdmin.email,
            },
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
        const { error } = AuthValidation.signIn(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const data = { email: req.body.email, password: req.body.password };
        const refresh = jwt.getToken({ email: data.email }, refreshTime.jwt);

        const updatedAuth = await Service.signIn(data, refresh);

        if (updatedAuth.nModified === 1) {
            const access = jwt.getToken({ email: req.body.email }, accessTime.jwt);
            res.cookie('access', access, { maxAge: accessTime.cookie, httpOnly: true });
            res.cookie('refresh', refresh, { maxAge: refreshTime.cookie, httpOnly: true });
            return res.status(200).json({ ok: true });
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
            const done = await Service.logout(verified.email, req.cookies.refresh);
            const options = { maxAge: 0, httpOnly: true };
            res.cookie('access', '', options);
            res.cookie('refresh', '', options);
            return res.status(200).json({
                data: done,
            });
        }
        if (verified.status === 1) {
            const options = { maxAge: accessTime.cookie, httpOnly: true };
            const newt = jwt.getToken({ email: verified.email }, accessTime.jwt);
            res.cookie('access', newt, options);
            return res.redirect('/v1/users/logout');
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
    signUp,
    signIn,
    logout,
};
