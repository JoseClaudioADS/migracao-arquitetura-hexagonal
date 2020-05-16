import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Response, Request } from 'express';
import 'express-async-errors';
import { ValidationError } from 'yup';
import routes from './routes';

import checkEnvs from './config';
import createConnection from './database';
import AppError from './errors/AppError';

import './config/container-di';

checkEnvs();
createConnection();

const app = express();
app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
            path: request.url,
            date: new Date(),
        });
    } else if (err instanceof ValidationError) {
        response.status(400).json({
            status: 'validation-error',
            message: err.message,
            errors: err.errors,
            path: request.url,
            date: new Date(),
        });
    } else {
        response.status(500).json({
            status: 'error',
            message: 'Internal server error',
            path: request.url,
            date: new Date(),
        });
    }
});

export default app;
