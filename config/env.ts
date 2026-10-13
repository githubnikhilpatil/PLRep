import dotenv from 'dotenv';
import path from 'path';

const environment = process.env.ENV || 'qa';

const envFile = path.resolve(
    process.cwd(),
    'config',
    'environments',
    `.env.${environment}`
);

dotenv.config({
    path: envFile
});

console.log(`Environment: ${environment}`);
console.log(`Config file: ${envFile}`);

export const env = {
    environment,
    App_URL: process.env.CRM_URL!,
    username: process.env.CRM_USERNAME!,
    password: process.env.CRM_PASSWORD!
};