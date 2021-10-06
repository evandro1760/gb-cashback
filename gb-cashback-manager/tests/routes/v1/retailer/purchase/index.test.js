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

jest.mock('@src/database/models/autoStatusPurchaseEvents.js', () => {
    const mockDB = new MockSequelize();
    const mock1 = {
        idAutoStatus: 1,
        cpf: '48639060053',
        idStatus: 2,
        createdAt: '2021-10-04T18:40:27.000Z',
        updatedAt: '2021-10-04T18:40:27.000Z',
    };
    return mockDB.define('AUTO_STATUS_PURCHASE_EVENTS', mock1, {
        instanceMethods: {
            findOne: function () {
                this.idStatus = 2;
                return this;
            },
        },
    });
});

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
    return mockDB.define('PURCHASE', mockDefinition, {
        instanceMethods: {
            save: function () {
                if (this.code === 'E654321') {
                    throw new MockSequelize.UniqueConstraintError({
                        errors: [
                            {
                                type: 'unique violation'
                            }
                        ]
                    });
                }
                this.idPurchase = 2;
                return this;
            },
        },
    });
});

jest.mock('@src/database/models/retailer.js', () => {
    const mockDB = new MockSequelize();
    const mock1 = {
        idRetailer: 1,
        name: 'Evandro',
        cpf: '24940336085',
        email: 'evandro.1760@gmail.com',
        hashedPassword: '63640264849a87c90356129d99ea165e37aa5fabc1fea46906df1a7ca50db492',
        previousCashbackBalance: 20,
        createdAt: '2021-10-04T18:40:27.000Z',
        updatedAt: '2021-10-04T18:40:27.000Z',
    };
    const retailer = mockDB.define('RETAILER', mock1);
    // retailer
    //     .$queryInterface
    //     .$useHandler((query, queryOptions, done) => {
    //         if (query === 'findOne' && queryOptions[0].where.email === 'evandro@gmail.com') {
    //             return null;
    //         }
    //     });
    return retailer;
});

jest.mock('@src/database/models/statusPurchaseEvents.js', () => {
    const mockDB = new MockSequelize();
    const mock1 = {
        idStatusEvent: 1,
        idPurchase: 1,
        idStatus: 1,
        createdAt: '2021-10-04T18:40:27.000Z',
        updatedAt: '2021-10-04T18:40:27.000Z',
    };
    const statusPurchaseEvents = mockDB.define('STATUS_PURCHASE_EVENTS', mock1);
    // statusPurchaseEvents
    //     .$queryInterface
    //     .$useHandler((query, queryOptions, done) => {
    //         if (query === 'findOne' && queryOptions[0].where.email === 'evandro@gmail.com') {
    //             return null;
    //         }
    //     });
    return statusPurchaseEvents;
});

process.env.NODE_ENV = 'test';

describe('Register a new purchase - POST /retailer/purchase', () => {
    const endpoint = '/v1/retailer/purchase';
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFJldGFpbGVyIjoxLCJpYXQiOjE2MzM1MDQwMzEsImV4cCI6NDc4NzEwNDAzMX0.p_hI7ikwA5yd7S3wc4m9pY0OfLLRhijrqSeJ8a58xf4';
    test('Returns 400', async () => {
        await request(initApp())
            .post(endpoint)
            .set('authorization', accessToken)
            .send({
                code: 'E123J456',
                amount: 1.01,
            })
            .expect(400)
            .then((response) => {
                expect(response).toSatisfyApiSpec();
            });
    }, 30000);
    test('Returns 401', async () => {
        await request(initApp())
            .post(endpoint)
            .set('authorization', 'batata')
            .send({
                code: 'E123J456',
                amount: 0.01,
                date: '2021-10-05',
            })
            .expect(401)
            .then((response) => {
                expect(response).toSatisfyApiSpec();
            });
    }, 30000);
    test('Returns 201', async () => {
        await request(initApp())
            .post(endpoint)
            .set('authorization', accessToken)
            .send({
                code: 'E123J456',
                amount: 0.01,
                date: '2021-10-05',
            })
            .expect(201)
            .then((response) => {
                expect(response).toSatisfyApiSpec();
            });
    }, 30000);
    test('Returns 409', async () => {
        await request(initApp())
            .post(endpoint)
            .set('authorization', accessToken)
            .send({
                code: 'E654321',
                amount: 100.0,
                date: '2021-01-05',
            })
            .expect(409)
            .then((response) => {
                expect(response).toSatisfyApiSpec();
            });
    }, 30000);
});
