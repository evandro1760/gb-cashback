import 'regenerator-runtime/runtime';
import request from 'supertest';
import {
    describe,
    test,
} from '@jest/globals';

import initApp from '@src/app.js';

process.env.NODE_ENV = 'test';

describe('Get cashback balance of a Retailer - GET /retailer/cashback/balance', () => {
    const endpoint = '/v1/retailer/cashback/balance';
    test('Returns 200', async () => {
        await request(initApp())
            .get(endpoint)
            .expect(200);
    }, 30000);
});
