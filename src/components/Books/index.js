const path = require('path');
const BookServices = require('./service');
/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function chart(req, res, next) {
    try {
        const books = await BookServices.getChartData();
        const map = new Map();
        books.forEach((el) => {
            const code = el.code3;
            if (isNaN(map[code])) {
                map[code] = 1;
            } else {
                map[code] += 1;
            }
        });
        const data = Object.keys(map).map((key) => ({ code3: key, value: map[key] }));
        return res.status(200).json({ data });
    } catch (error) {
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
async function page(req, res, next) {
    try {
        return res.sendFile(path.resolve('public/index.html'));
    } catch (error) {
        res.status(500).send(`message: ${error.name},\n
        details: ${error.message}`);

        return next(error);
    }
}

module.exports = {
    chart,
    page,
};
