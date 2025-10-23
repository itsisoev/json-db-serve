import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import {LowdbStorage} from './storage/lowdb.js';
import {buildRouter} from './router.js';
import {errorHandler} from './middleware/errorHandler.js';

export function createApp(dbPath) {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(morgan('dev'));

    const storage = new LowdbStorage(dbPath);
    app.use('/', buildRouter(storage));

    app.use(errorHandler);
    return app;
}
