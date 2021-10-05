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
    EXPIRES_IN: process.env.JWT_EXPIRES_IN,
};
