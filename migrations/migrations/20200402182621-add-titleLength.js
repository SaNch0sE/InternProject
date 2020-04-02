module.exports = {
    async up(db) {
        const books = db.collection('books');

        const date = new Date().getTime();
        await books.find({}).forEach((el) => {
            const title = el.title.length;
            books.updateOne({ _id: el._id }, { $set: { titleLength: title, updatedAt: date } });
        });
        console.log(`UpdatedAt:${date}`);
    },
    async down(db) {
        const books = db.collection('books');

        await books.find({}).forEach((el) => {
            const date = el.createdAt;
            books.updateOne({ _id: el._id }, { $set: { updatedAt: date }, $unset: { titleLength: '' } });
        });
    },
};
