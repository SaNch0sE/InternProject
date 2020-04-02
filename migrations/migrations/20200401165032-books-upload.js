const XLSX = require('xlsx');

module.exports = {
    async up(db) {
        const table = XLSX.readFile('../books.xlsx');
        const data = XLSX.utils.sheet_to_json(table.Sheets[table.SheetNames[0]]);

        const books = db.collection('books');
        await books.insertMany(data);

        const date = new Date().getTime();
        await books.updateMany({}, { $set: { createdAt: date, updatedAt: date } });
        console.log(`CreatedAt:${date}`);
    },
    async down(db) {
        const books = db.collection('books');
        books.deleteMany({});
    },
};
