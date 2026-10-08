import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';


async function globalTeardown() {

    const executionFolder = process.env.ALLURE_EXECUTION_FOLDER; 

    const resultsFolder = path.join(
        executionFolder,
        'temp-results'
    );
    const finalReportFolder = path.join(executionFolder,'FinalReport');

    console.log('\n====================================');
    console.log('Generating Allure Report');
    console.log('====================================\n');
    console.log(`executionFolder  ${executionFolder}`);
    console.log(`resultsFolder  ${resultsFolder}`);

    try {

        execSync(
            `allure generate "${resultsFolder}"--clean -o "${finalReportFolder}"`,
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
    }
}

export default globalTeardown;