import 'regenerator-runtime/runtime';
import request from 'supertest';
import {
    describe,
    jest,
    test,
    expect,
} from '@jest/globals';
import jestOpenAPI from 'jest-openapi';
import MockSequelize from 'sequelize-mock';

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
    const retailer = mockDB.define('RETAILER', mock1);
    retailer
        .$queryInterface
        .$useHandler((query, queryOptions, done) => {
            if (query === 'findOne' && queryOptions[0].where.email === 'evandro@gmail.com') {
                return null;
            }
        });
    return retailer;
});

process.env.NODE_ENV = 'test';

describe('Retailer Login - POST /retailer/auth/signin', () => {
    const endpoint = '/v1/retailer/auth/signin';

    test('Returns 200', async () => {
        await request(initApp())
            .post(endpoint)
            .send({
                email: 'evandro.1760@gmail.com',
                password: '12345678910',
            })
            .expect(200)
            .then((response) => {
                expect(response).toSatisfyApiSpec();
            });
    }, 30000);

    test('Returns 400', async () => {
        await request(initApp())
            .post(endpoint)
            .send({
                email: 'evandro.1760@gmail.com',
                password: '123',
            })
            .expect(400)
            .then((response) => {
                expect(response).toSatisfyApiSpec();
            });
    }, 30000);

    test('Returns 401', async () => {
        await request(initApp())
            .post(endpoint)
            .send({
                email: 'evandro@gmail.com',
                password: '123456718910',
            })
            .expect(401)
            .then((response) => {
                expect(response).toSatisfyApiSpec();
            });
    }, 30000);
});
