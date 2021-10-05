import { readFileSync } from 'fs';

const openApiDefinition = JSON.parse(readFileSync('./src/static/gb-cashback-manager.swagger.json'));

export default openApiDefinition;
