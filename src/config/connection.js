const mongoose = require('mongoose');
require('dotenv').config();

const { MONGO_URI } = process.env;

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
    ssl: true,
    dbName: 'Books',
};

module.exports = mongoose.createConnection(MONGO_URI, connectOptions);
