import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';
import { env } from './config/env';

async function globalSetup() {

    const filePath = path.resolve(
        process.cwd(),
        'test-data',
        env.environment.toUpperCase(),
        'TestData.xlsx'
    );

    console.log(
        `Loading test data from: ${filePath}`
    );

    if (!fs.existsSync(filePath)) {
        throw new Error(
            `Test data file not found: ${filePath}`
        );
    }

    // Read Excel ONCE
    const workbook = XLSX.readFile(filePath);

    const testData: Record<string, any[]> = {};

    // Read every sheet once
    for (const sheetName of workbook.SheetNames) {

        const worksheet =
            workbook.Sheets[sheetName];

        testData[sheetName] =
            XLSX.utils.sheet_to_json(worksheet);
    }

    // Create cache directory
    const cacheFolder = path.resolve(
        process.cwd(),
        '.test-data-cache'
    );

    if (!fs.existsSync(cacheFolder)) {
        fs.mkdirSync(cacheFolder, {
            recursive: true
        });
    }

    // Environment-specific cache
    const cacheFile = path.join(
        cacheFolder,
        `${env.environment}.json`
    );

    fs.writeFileSync(
        cacheFile,
        JSON.stringify(testData, null, 2),
        'utf-8'
    );

    console.log(
        `Test data loaded successfully`
    );

    console.log(
        `Test data cache: ${cacheFile}`
    );

    console.log(
        `Sheets loaded: ${workbook.SheetNames.join(', ')}`
    );
}

export default globalSetup;