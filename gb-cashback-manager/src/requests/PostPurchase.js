import { validate } from 'jsonschema';
import createError from 'http-errors';

import openApiDefinition from '../static/openApiDefinition.js';

export default class PostPurchase {
    constructor(request) {
        this.request = request;
        const scheme = openApiDefinition.definitions.postRetailerPurchaseRequest;
        const isValidBody = validate(this.request.body, scheme).valid;
        if (!isValidBody) {
            throw createError(
                400,
                'Invalid code (least 1 character), amount (number greater than zero) or date format (in format YYYY-MM-DD). Must be a string with least 1 character',
            );
        }
        this.code = request.body.code;
        this.amount = request.body.amount;
        this.date = request.body.date;
        this.timestamp = request.timestamp;
        this.logger = request.log;
        this.idRetailer = request.session.idRetailer;
    }
}
