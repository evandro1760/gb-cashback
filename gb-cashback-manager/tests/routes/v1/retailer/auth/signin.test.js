import 'regenerator-runtime/runtime';
import request from 'supertest';
import {
    describe,
    test,
} from '@jest/globals';

import initApp from '@src/app.js';

process.env.NODE_ENV = 'test';

describe('Retailer Login - POST /retailer/auth/signin', () => {
    const endpoint = '/v1/retailer/auth/signin';
    test('Returns 200', async () => {
        await request(initApp())
            .post(endpoint)
            .expect(200);
    }, 30000);
});
