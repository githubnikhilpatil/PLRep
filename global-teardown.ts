import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';


async function globalTeardown() {

    const executionFolder = process.env.ALLURE_EXECUTION_FOLDER;
    const resultsFolder = process.env.ALLURE_RESULTS_FOLDER;

    if (!executionFolder || !resultsFolder) {
        throw new Error(
            'ALLURE_EXECUTION_FOLDER and ALLURE_RESULTS_FOLDER must be set before generating the report.'
        );
    }

    const resultFiles = fs.readdirSync(resultsFolder).filter(
        (file) => file.endsWith('-result.json')
    );

    if (resultFiles.length === 0) {
        throw new Error(
            `No Allure test result files were found in: ${resultsFolder}`
        );
    }

    const finalReportFolder = path.join(executionFolder, 'FinalReport');

    console.log('\n====================================');
    console.log('Generating Allure Report');
    console.log('====================================\n');
    console.log(`executionFolder  ${executionFolder}`);
    console.log(`resultsFolder  ${resultsFolder}`);

    try {

        execSync(
            `allure generate "${resultsFolder}" --clean --single-file -o "${finalReportFolder}"`,
            {
                stdio: 'inherit'
            }
        );

    
        console.log('\n====================================');
        console.log('Allure Report Generated Successfully');
        console.log(`Location: ${executionFolder}`);
        console.log('====================================\n');

    } catch (error) {

        console.error(
            'Failed to generate Allure report:',
            error
        );
        throw error;
    }
}

export default globalTeardown;