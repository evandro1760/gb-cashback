import 'regenerator-runtime/runtime';
import request from 'supertest';
import {
    describe,
    test,
} from '@jest/globals';

import initApp from '@src/app.js';

process.env.NODE_ENV = 'test';

describe('Request a wrong route', () => {
    const endpoint = '/123';
    test('Returns 405', async () => {
        await request(initApp())
            .get(endpoint)
            .expect(405);
    }, 30000);
});
