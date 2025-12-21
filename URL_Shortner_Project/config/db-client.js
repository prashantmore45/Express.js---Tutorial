import { MongoClient } from 'mongodb';
import { envSchema } from './env.js';

export const client = new MongoClient(envSchema.MONGODB_URL);

