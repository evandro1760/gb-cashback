import createError from 'http-errors';
import httpRequest from '../components/httpRequest.js';

import { EXTERNAL_CASHBACK } from '../config/env.js';

export default class ExternalCashback {
    constructor(logger) {
        this.logger = logger;
    }

    async getRetailerCashbackByCPF(cpf) {
        const params = { cpf };
        return httpRequest({
            method: 'GET',
            url: `${EXTERNAL_CASHBACK.HOST}/v1/cashback`,
            params,
            headers: {
                token: EXTERNAL_CASHBACK.ACCESS_TOKEN,
            },
            acceptableStatus: [200],
            logger: this.logger,
        });
    }

    async retailerCashbackCredit(cpf) {
        const result = await this.getRetailerCashbackByCPF(cpf);
        if (result.body.statusCode !== 200) {
            throw createError(500);
        }
        return result.body.body.credit;
    }
}
