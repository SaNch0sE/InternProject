const connect = require('connect');
const bodyParser = require('body-parser');
const http = require('http');
const harmon = require('harmon');
const middleware = require('./App/middleware');
const selects = require('./App/selector');

const app = connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(harmon([], selects, true));
// respond to all requests
app.use(middleware);

http.createServer(app).listen(8000);
