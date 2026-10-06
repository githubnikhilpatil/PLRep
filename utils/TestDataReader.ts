import * as XLSX from 'xlsx';
import path from 'path';

export interface TestData {
    TestCase: string;
    Scenario: string;
    [key: string]: string;
}

export class TestDataReader {

    private workbook: XLSX.WorkBook;

    constructor(fileName: string = 'TestData.xlsx') {

        const filePath = path.resolve(
            process.cwd(),
            'test-data',
            fileName
        );

        this.workbook = XLSX.readFile(filePath);
    }

    /**
     * Returns all parameters and values
     * for a specific TestCase.
     */
    public getTestData(
        sheetName: string,
        testCase: string
    ): TestData {

        const worksheet = this.workbook.Sheets[sheetName];

        if (!worksheet) {
            throw new Error(
                `Excel sheet '${sheetName}' not found`
            );
        }

        const rows = XLSX.utils.sheet_to_json<{
            TestCase: string;
            Scenario: string;
            Parameter: string;
            Value: string | number;
        }>(
            worksheet,
            {
                defval: ''
            }
        );

        const testRows = rows.filter(
            row => row.TestCase === testCase
        );

        if (testRows.length === 0) {
            throw new Error(
                `TestCase '${testCase}' not found in sheet '${sheetName}'`
            );
        }

        const testData: TestData = {
            TestCase: testCase,
            Scenario: testRows[0].Scenario
        };

        for (const row of testRows) {

            if (!row.Parameter) {
                continue;
            }

            testData[row.Parameter] = String(row.Value);
        }

        return testData;
    }
}