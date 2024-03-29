import 'regenerator-runtime/runtime';
import request from 'supertest';
import {
    describe,
    test,
} from '@jest/globals';

import initApp from '@src/app.js';

process.env.NODE_ENV = 'test';

describe('Application health ok - GET /actuator/health', () => {
    const endpoint = '/actuator/health';
    test('Returns 200', async () => {
        await request(initApp())
            .get(endpoint)
            .expect(200);
    }, 30000);
});
