import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';
import { env } from '../config/env';

export interface TestData {
    [key: string]: any;
}

export class TestDataReader {

    private static data: Record<string, TestData[]> | null = null;

    public static getData(tcId: string): TestData {

        this.initialize();

        for (const sheetName of Object.keys(this.data!)) {

            const rows = this.data![sheetName];

            const data = rows.find(
                row => String(row.TestCaseID) === tcId
            );

            if (data) {
                return data;
            }
        }

        throw new Error(
            `Test case '${tcId}' not found in test data`
        );
    }

    private static initialize(): void {

        if (this.data) {
            return;
        }

        const cacheFile = path.resolve(
            process.cwd(),
            '.test-data-cache',
            `${env.environment}.json`
        );

        if (!fs.existsSync(cacheFile)) {

            throw new Error(
                `Test data cache not found: ${cacheFile}`
            );
        }

        this.data = JSON.parse(
            fs.readFileSync(cacheFile, 'utf-8')
        );
    }
}