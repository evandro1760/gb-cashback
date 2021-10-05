import 'regenerator-runtime/runtime';
import request from 'supertest';
import {
    describe,
    test,
} from '@jest/globals';

import initApp from '@src/app.js';

process.env.NODE_ENV = 'test';

describe('List all Retailer purchases - GET /retailer/purchase/list', () => {
    const endpoint = '/v1/retailer/purchase/list';
    test('Returns 200', async () => {
        await request(initApp())
            .get(endpoint)
            .expect(200);
    }, 30000);
});
