import { validate } from 'jsonschema';
import createError from 'http-errors';

import openApiDefinition from '../static/openApiDefinition.js';
import isCPFValid from '../components/formatUtils.js';

export default class PostSignInRequest {
    constructor(request) {
        this.request = request;
        const scheme = openApiDefinition.definitions.retailerSignUpRequest;
        const isValidBody = validate(this.request.body, scheme).valid;
        if (!isValidBody) {
            throw createError(
                400,
                'Invalid name (least 1 character), email or password (least 8 characters)',
            );
        }
        if (!isCPFValid(request.body.cpf)) {
            throw createError(
                400,
                'Invalid cpf format. Must be a string with a valid CPF at least 11 digits',
            );
        }
        this.name = request.body.name;
        this.cpf = request.body.cpf;
        this.email = request.body.email;
        this.password = request.body.password;
        this.timestamp = request.timestamp;
        this.logger = request.log;
    }
}
