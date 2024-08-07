import { mongoose } from '@typegoose/typegoose';
import { logger } from './logger';

export function connectToDatabase() {
    mongoose
        .connect(process.env.DATABASE_URI!, { autoIndex: true })
        .then(() => {
            logger.info('Connected to Database!');
        })
        .catch(() => {
            logger.error('Failed to connect to database !');
        });
}
