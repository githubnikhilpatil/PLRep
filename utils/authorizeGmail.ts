
import { GmailHelper } from './GmailHelper';

async function main() {
    // This call triggers OAuth authorization and saves token.json.
    await GmailHelper.getVerificationLink(
        'automationsusers+automationuservx8t91nz@gmail.com',
        'Validate your FreeCRM account',
        'Click here to complete the account',
        1000
    ).catch(error => {
        console.log(
            'Authorization completed or email retrieval stopped:',
            error.message
        );
    });
}

main();
