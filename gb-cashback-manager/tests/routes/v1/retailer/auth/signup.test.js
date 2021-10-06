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
    return mockDB.define('RETAILER', mock1, {
        instanceMethods: {
            save: function () {
                if (this.cpf === '12444778006' || this.email === 'evandro.2560@gmail.com') {
                    throw new MockSequelize.UniqueConstraintError({
                        errors: [
                            {
                                type: 'unique violation'
                            }
                        ]
                    });
                }
                return this;
            },
        },
    });
});

process.env.NODE_ENV = 'test';

describe('Retailer registration - POST /retailer/auth/signup', () => {
    const endpoint = '/v1/retailer/auth/signup';
    test('Returns 201', async () => {
        await request(initApp())
            .post(endpoint)
            .send({
                name: 'Evandro',
                cpf: '19700046060',
                email: 'evandro.2570@gmail.com',
                password: '@dale123456',
            })
            .expect(201)
            .then((response) => {
                expect(response).toSatisfyApiSpec();
            });
    }, 30000);
    test('Returns 400 - invalid password', async () => {
        await request(initApp())
            .post(endpoint)
            .send({
                name: 'Evandro',
                cpf: '92328872077',
                email: 'evandro.1660@gmail.com',
                password: '123',
            })
            .expect(400)
            .then((response) => {
                expect(response).toSatisfyApiSpec();
            });
    }, 30000);
    test('Returns 400 - invalid cpf', async () => {
        await request(initApp())
            .post(endpoint)
            .send({
                name: 'Evandro',
                cpf: '12345678910',
                email: 'evandro.2560@gmail.com',
                password: '123456789',
            })
            .expect(400)
            .then((response) => {
                expect(response).toSatisfyApiSpec();
            });
    }, 30000);
    test('Returns 409 - cpf conflict', async () => {
        await request(initApp())
            .post(endpoint)
            .send({
                name: 'Evandro',
                cpf: '12444778006',
                email: 'evandro.2450@gmail.com',
                password: '@d1le123456',
            })
            .expect(409)
            .then((response) => {
                expect(response).toSatisfyApiSpec();
            });
    }, 30000);
    test('Returns 409 - email conflict', async () => {
        await request(initApp())
            .post(endpoint)
            .send({
                name: 'Evandro',
                cpf: '85570715070',
                email: 'evandro.2560@gmail.com',
                password: '@d1le123456',
            })
            .expect(409)
            .then((response) => {
                expect(response).toSatisfyApiSpec();
            });
    }, 30000);
});
