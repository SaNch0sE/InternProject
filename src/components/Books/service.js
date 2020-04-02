const Books = require('./model');
/**
 * @method getChartData
 * @param {any}
 * @returns {any}
 */
async function getChartData() {
    return Books.find({}, { code3: 1 });
}

module.exports = {
    getChartData,
};
