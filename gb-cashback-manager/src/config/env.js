import dotenv from 'dotenv';
import { readFileSync } from 'fs';

dotenv.config({ path: 'src/config/application-local.properties' });
const { name, version, description } = JSON.parse(readFileSync('package.json'));

export const SERVER = {
    PORT: process.env.PORT,
    NAME: name,
    TIMEOUT: parseInt(process.env.TIMEOUT, 10),
    VERSION: version,
    DESC: description,
};

export const JWT = {
    SECRET: process.env.JWT_SECRET,
    EXPIRES_IN: parseInt(process.env.JWT_EXPIRES_IN, 10),
};

export const MYSQL = {
    DATABASE: process.env.MYSQL_DATABASE,
    USER: process.env.MYSQL_USER,
    PASSWORD: process.env.MYSQL_PASSWORD,
    HOST: process.env.MYSQL_HOST,
    PORT: parseInt(process.env.MYSQL_PORT, 10),
    LOGGING: process.env.MYSQL_LOGGING === 'true',
};

export const EXTERNAL_CASHBACK = {
    HOST: process.env.EXTERNAL_CASHBACK_HOST,
    ACCESS_TOKEN: process.env.EXTERNAL_CASHBACK_TOKEN,
};
