import * as allure from 'allure-js-commons';
import { Page } from '@playwright/test';

export class AllureHelper {

    // Existing info method
    static async info(
        page: Page,
        message: string,
        status: string,
        captureScreenshot: boolean = false
    ): Promise<void> {

        await allure.step(message, async () => {

            if (captureScreenshot) {
                const screenshot = await page.screenshot();

                await allure.attachment(
                    `${message} - Screenshot`,
                    screenshot,
                    'image/png'
                );
            }
        });
    }


    // Validate method
    static async validate(
        page: Page,
        message: string,
        status: 'Passed' | 'Fail',
        captureScreenshot: boolean = false
    ): Promise<void> {

        if (status === 'Fail') {

            if (captureScreenshot) {

                const screenshot = await page.screenshot();

                await allure.attachment(
                    `${message} - Failure Screenshot`,
                    screenshot,
                    'image/png'
                );
            }

            // Mark Allure step as FAILED
            await allure.logStep(
                message,
                allure.Status.FAILED
            );

            // IMPORTANT:
            // This makes the Playwright test FAILED
            throw new Error(`${message} - Validation Failed`);
        }

        // Passed
        await allure.logStep(
            message,
            allure.Status.PASSED
        );
    }
}