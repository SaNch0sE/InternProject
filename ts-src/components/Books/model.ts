import { Schema, Model } from 'mongoose';
import connections from '../../config/connection';
import ISchema from '../interfaces/IScema';

class ConnectionModel {
    BooksSchema(): Schema {
        return new Schema(
            {
                title: {
                    type: String,
                    trim: true,
                },
                titleLength: {
                    type: Number,
                    required: false,
                },
                description: {
                    type: String,
                    required: true,
                },
                code3: {
                    type: String,
                    required: true,
                },
                createdAt: {
                    type: Date,
                    required: true,
                },
                updatedAt: {
                    type: Date,
                    required: true,
                },
            },
            {
                collection: 'books',
                versionKey: false,
            },
        );
    }

    get(): Model<ISchema> {
        return connections.model('books', this.BooksSchema());
    }
}

export default new ConnectionModel().get();
