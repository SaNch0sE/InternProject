const puppeteer = require('puppeteer-firefox');
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/';
const MONGODB_DB_MAIN = 'users_db';
const MONGO_URI = `${MONGODB_URI}${MONGODB_DB_MAIN}`;

const connectOptions = {
    // automatically try to reconnect when it loses connection
    autoReconnect: true,
    // reconnect every reconnectInterval milliseconds
    // for reconnectTries times
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    // flag to allow users to fall back to the old
    // parser if they find a bug in the new parse
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const connections = mongoose.createConnection(MONGO_URI, connectOptions);

const emailsCollection = new mongoose.Schema(
    {
        Mails: [{
            email: {
                type: String,
            },
        }],
    },
    {
        collection: 'emails',
        versionKey: false,
    },
);
const model = connections.model('emailsCollection', emailsCollection);

async function parseMails(uri) {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(uri);
        const mails = await page.evaluate(() => {
            // eslint-disable-next-line no-undef
            const items = Array.from(document.querySelectorAll('.email'));
            return items.map((el) => ({ email: el.innerText }));
        });
        browser.close();
        return mails;
    } catch (e) {
        console.error(e);
        return false;
    }
}

const url = 'http://localhost:3000/v1/users';
parseMails(url).then((mails) => {
    model.create({ Mails: mails }, (err, resp) => {
        if (err) {
            console.error(err);
            return process.exit(1);
        }
        console.log(JSON.stringify(resp, null, '\t'));
        return process.exit();
    });
});
