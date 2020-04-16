const connect = require('connect');
const bodyParser = require('body-parser');
const http = require('http');
const harmon = require('harmon');
const cors = require('cors');
const middleware = require('./App/middleware');
const selects = require('./App/selector');

const app = connect();

const whitelist = ['http://localhost:8000', 'http://play.google.com'];

const corsOptions = {
    origin(origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(harmon([], selects, true));
app.use(cors({
    origin: corsOptions.origin,
    optionsSuccessStatus: 200,
}));
// respond to all requests
app.use(middleware);

http.createServer(app).listen(8000);
