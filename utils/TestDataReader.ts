import * as XLSX from 'xlsx';
import path from 'path';
import { env } from '../config/env';

export interface TestData {
    [key: string]: any;
}

export class TestDataReader {

    private static workbook: XLSX.WorkBook;

    public static load(): void {

        const filePath = path.resolve(
            process.cwd(),
            'test-data',
            env.environment.toUpperCase(),
            'TestData.xlsx'
        );

        this.workbook = XLSX.readFile(filePath);

        console.log(`Test data loaded from: ${filePath}`);
    }

    public static getData(tcId: string): TestData {

        if (!this.workbook) {
            this.load();
        }

        const sheetName = 'Contacts';

        const worksheet =
            this.workbook.Sheets[sheetName];

        if (!worksheet) {
            throw new Error(
                `Sheet '${sheetName}' not found`
            );
        }

        const rows: TestData[] =
            XLSX.utils.sheet_to_json(worksheet);

        console.log(rows);

        const data = rows.find(
            row => String(row.TestCaseID) === tcId
        );
        console.log(data);
        if (!data) {
            throw new Error(
                `Test case '${tcId}' not found in ${sheetName} sheet`
            );
        }

        return data;
    }
}