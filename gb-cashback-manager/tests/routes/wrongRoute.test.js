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
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFJldGFpbGVyIjoxLCJpYXQiOjE2MzM1MDQwMzEsImV4cCI6NDc4NzEwNDAzMX0.p_hI7ikwA5yd7S3wc4m9pY0OfLLRhijrqSeJ8a58xf4';
    test('Returns 405', async () => {
        await request(initApp())
            .get(endpoint)
            .set('authorization', accessToken)
            .expect(405);
    }, 30000);
});
