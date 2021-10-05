import axios from 'axios';
import createError from 'http-errors';
import qs from 'qs';

import { SERVER } from '../config/env.js';
/**
 * Make a HTTP Request with the given params
 * @param {string} method
 * @param {string} url
 * @param {object} params
 * @param {object} headers
 * @param {object} data
 * @param {array} acceptableStatus
 * @param {object} logger
 * @param {number} timeout
 */
const makeRequest = async ({
    method = 'get',
    url,
    params = null,
    headers = {},
    data = null,
    acceptableStatus = null,
    logger = null,
    timeout = 40000,
} = {}) => {
    const config = {
        method,
        url,
        params,
        headers,
        timeout,
    };
    const additionalHeaders = {
        'x-source': SERVER.NAME,
    };
    config.headers = { ...additionalHeaders, ...config.headers };
    if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
        config.data = data ? qs.stringify(data) : null;
    } else {
        config.headers['Content-Type'] = 'application/json';
        config.data = data ? JSON.stringify(data) : null;
    }
    if (acceptableStatus) {
        config.validateStatus = (status) => acceptableStatus.includes(status);
    } else {
        config.validateStatus = (status) => status >= 200 && status < 300;
    }
    try {
        const result = await axios(config);
        logger?.child({
            httpRequest: {
                url,
                status: result.status,
            },
        })?.info();

        return {
            body: result.data,
            status: result.status,
            headers: result.headers,
        };
    } catch (error) {
        logger?.child({
            httpRequest: {
                url,
                status: error?.response?.status || null,
                error: error.toString(),
            },
        })?.info();
        throw createError(error?.response?.status || 500);
    }
};
export {
    makeRequest as default,
};
