import { Router } from 'express';
import createError from 'http-errors';

const errorRouter = Router();

errorRouter.all('*', (request, response, next) => next(createError(405, 'method or endpoint not alowed')));

const getErrorPayload = (error) => {
    const payload = {
        body: {
            errorMessage: error.toString(),
        },
        status: 500,
    };
    const defaultMessages = {
        500: 'unexpected error encountered',
        503: 'consulted service is unavailable or returned an unexpected response',
    };
    if (error.status) {
        payload.status = error.status;
        payload.body.errorMessage = error.message
            || defaultMessages[error.status]
            || payload.body.errorMessage;
    }
    if (error.extras) {
        payload.body = { ...payload.body, ...error.extras };
    }
    return payload;
};

const errorHandler = (err, request, response, next) => {
    if (!response.headersSent) {
        const payload = getErrorPayload(err);
        payload.body.timestamp = request.timestamp;
        payload.body.transactionId = request.transactionId;
        request.log?.child({
            error: payload.body.errorMessage,
            status: payload.status,
        })?.error();
        response.status(payload.status).json(payload.body);
    }
    return next();
};

export default [errorRouter, errorHandler];
