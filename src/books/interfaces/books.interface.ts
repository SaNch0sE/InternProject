import { Document } from 'mongoose';

export interface Books extends Document {
    readonly code3: string;
    readonly title?: string;
    readonly description?: string;
    readonly createdAt?: number;
    readonly updatedAt?: number;
}