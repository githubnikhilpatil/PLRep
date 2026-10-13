import fs from 'fs';
import path from 'path';
let executionFolder: string;
export function createExecutionFolder(): string {

    const now = new Date();

    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yyyy = now.getFullYear();

    const hr = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');

    const folderName =
        `AllureReport_${dd}${mm}${yyyy}_${hr}${min}`;

    const folder = path.join(
        process.cwd(),
        'AllureReports',
        folderName
    );

    fs.mkdirSync(folder, {
        recursive: true
    });
    executionFolder =folder;
    return folder;
}


export function getExecutionFolder(): string {

    if (!executionFolder) {
        throw new Error(
            'Execution folder has not been created yet.'
        );
    }

    return executionFolder;
}