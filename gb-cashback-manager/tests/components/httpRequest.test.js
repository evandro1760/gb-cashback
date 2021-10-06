import 'regenerator-runtime/runtime';

import { describe, expect, test } from '@jest/globals';

import httpRequest from '@src/components/httpRequest.js';
import { logger } from '@src/middlewares/logger.js';

describe('Simple HTTP request test', () => {
    test('Make a GET request to postman-echo.com', async () => {
        const { status, body, headers } = await httpRequest({
            method: 'GET',
            url: 'http://postman-echo.com/get',
            acceptableStatus: [200],
        });
        expect(status).toBe(200);
        expect(headers).toBeDefined();
        expect(body).toBeDefined();
    });
    test('Make a request to a not found path', async () => {
        await httpRequest({
            method: 'POST',
            url: 'http://postman-echo.com/posti',
            data: { test: true },
            logger,
        }).catch((error) => {
            expect(error.status).toBe(404);
        });
    });
});
