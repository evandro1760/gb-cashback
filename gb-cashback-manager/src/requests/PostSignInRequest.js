import { validate } from 'jsonschema';
import createError from 'http-errors';

import openApiDefinition from '../static/openApiDefinition.js';

export default class PostSignInRequest {
    constructor(request) {
        this.request = request;
        const scheme = openApiDefinition.definitions.retailerSignInRequest;
        const isValidBody = validate(this.request.body, scheme).valid;
        if (!isValidBody) {
            throw createError(
                400,
                'Invalid email or password format. email must be a string with a valid email and password must be a string with least 8 characters',
            );
        }
        this.email = request.body.email;
        this.password = request.body.password;
        this.timestamp = request.timestamp;
        this.logger = request.log;
    }
}
