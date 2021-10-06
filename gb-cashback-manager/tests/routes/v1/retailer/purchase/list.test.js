import 'regenerator-runtime/runtime';
import request from 'supertest';
import {
    describe,
    jest,
    test,
    expect,
} from '@jest/globals';
import MockSequelize from 'sequelize-mock';
import jestOpenAPI from 'jest-openapi';

import initApp from '@src/app.js';
import openApiDefinition from '@src/static/openApiDefinition.js'

jestOpenAPI(openApiDefinition);

jest.mock('@src/database/models/purchase.js', () => {
    const mockDB = new MockSequelize();
    const mockDefinition = {
        idPurchase: 1,
        code: 'E123456',
        amount: 12.56,
        date: '2021-10-06',
        idRetailer: 1,
        createdAt: '2021-10-04T18:40:27.000Z',
        updatedAt: '2021-10-04T18:40:27.000Z',
    };
    return mockDB.define('PURCHASE', mockDefinition);
});

jest.mock('@src/database/models/statusPurchaseEvents.js', () => {
    const mockDB = new MockSequelize();
    const mock1 = {
        idStatusEvent: 1,
        idPurchase: 1,
        idStatus: 2,
        createdAt: '2021-10-04T18:40:27.000Z',
        updatedAt: '2021-10-04T18:40:27.000Z',
    };
    const statusPurchaseEvents = mockDB.define('STATUS_PURCHASE_EVENTS', mock1);
    statusPurchaseEvents
        .$queryInterface
        .$useHandler((query, queryOptions, done) => {
            const { idRetailer } = queryOptions[0].include[0].where;
            if (query === 'findAll' && idRetailer === 1) {
                const limit = queryOptions[0].limit ?? 10;
                const result = [];
                for (let x = 0; x < limit; x++) {
                    result.push(statusPurchaseEvents.build({
                        idPurchase: x,
                        'PURCHASE.date': '2021-10-06',
                        'PURCHASE.amount': 10.00,
                        'PURCHASE.code': `E${x}EA`,
                        'STATUS_PURCHASE.statusName': 'Aprovado',
                    }));
                }
                return result;
            }
            return [];
        });
    return statusPurchaseEvents;
});

jest.mock('@src/database/models/statusPurchase.js', () => {
    const mockDB = new MockSequelize();
    const mock1 = {
        idStatus: 2,
        statusName: 'Aprovado',
        createdAt: '2021-10-04T18:40:27.000Z',
        updatedAt: '2021-10-04T18:40:27.000Z',
    };
    const statusPurchase = mockDB.define('STATUS_PURCHASE', mock1);
    // statusPurchaseEvents
    //     .$queryInterface
    //     .$useHandler((query, queryOptions, done) => {
    //         if (query === 'findOne' && queryOptions[0].where.email === 'evandro@gmail.com') {
    //             return null;
    //         }
    //     });
    return statusPurchase;
});

process.env.NODE_ENV = 'test';

describe('List all Retailer purchases - GET /retailer/purchase/list', () => {
    const endpoint = '/v1/retailer/purchase/list';
    const accessToken1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFJldGFpbGVyIjoxLCJpYXQiOjE2MzM1MDQwMzEsImV4cCI6NDc4NzEwNDAzMX0.p_hI7ikwA5yd7S3wc4m9pY0OfLLRhijrqSeJ8a58xf4';
    const accessToken2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFJldGFpbGVyIjoyLCJpYXQiOjE2MzM1MDgyMTksImV4cCI6NDc4NzEwODIxOX0.RrO3WXlJ-TrILwymvloNBH-IYb02PziYHNs3d963r9M';
    test('Returns 200', async () => {
        await request(initApp())
            .get(endpoint)
            .set('authorization', accessToken1)
            .expect(200)
            .then((response) => {
                expect(response).toSatisfyApiSpec();
            });
    }, 30000);
    test('Returns 404', async () => {
        await request(initApp())
            .get(endpoint)
            .set('authorization', accessToken2)
            .expect(404)
            .then((response) => {
                expect(response).toSatisfyApiSpec();
            });
    }, 30000);
    test('Returns 401', async () => {
        await request(initApp())
            .get(endpoint)
            .set('authorization', 'batata')
            .expect(401)
            .then((response) => {
                expect(response).toSatisfyApiSpec();
            });
    }, 30000);
});
