const puppeteer = require('puppeteer-firefox');
const { Schema } = require('mongoose');
const unirest = require('unirest');
const fs = require('fs');
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

const Screenshots = new Schema(
    {
        Link: {
            type: String,
            trim: true,
        },
    },
    {
        collection: 'Screenshots',
        versionKey: false,
    },
);
const model = connections.model('Screenshots', Screenshots);
// Config done

async function CreateScreenshot() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/v1/users');
    await page.screenshot({ path: 'screenshots/example.png' });
    await browser.close();
    return 0;
}

function uploadImage() {
    return new Promise((resolve, reject) => {
        unirest('POST', 'https://api.imgur.com/3/image')
            .headers({
                Authorization: 'Client-ID #####6fb1b3666b',
            })
            .field('image', fs.readFileSync('screenshots/example.png').toString('base64'))
            .end((res) => {
                if (res.error) {
                    reject(res.error);
                    return;
                }
                model.create({ Link: res.body.data.link }, (err, resp) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    console.log(resp);
                });
                model.find({}).exec((err, resp) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(JSON.stringify(resp, null, '\t'));
                });
            });
    });
}

CreateScreenshot().then(uploadImage().then((res) => {
    console.log(res);
    process.exit();
}));
