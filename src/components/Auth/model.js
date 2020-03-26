const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const AdminSchema = new Schema(
    {
        fullName: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            dropDups: true,
        },
        password: {
            type: String,
            required: true,
        },
        session: {
            type: String,
            required: true,
        },
    },
    {
        collection: 'admin',
        versionKey: false,
    },
);

module.exports = connections.model('AdminModel', AdminSchema);
