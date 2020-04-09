import { Document } from 'mongoose';

export default interface ISchema extends Document {
    title?: string;
    titleLength?: number;
    description?: string;
    code3: string;
    createdAt?: string;
    updatedAt?: string;
}
