import {
    test as base,
    chromium,
    firefox,
    Browser,
    BrowserContext,
    Page
} from '@playwright/test';

import { env } from '../config/env';

type MyFixtures = {
    page: Page;
};
export const test = base.extend<MyFixtures>({
    page: async ({}, use) => {

        const browserName = process.env.BROWSER || 'chrome';

        let browser: Browser;

        if (browserName === 'chrome') {

            browser = await chromium.launch({
                channel: 'chrome',
                headless: false
            });

        } else if (browserName === 'edge') {

            browser = await chromium.launch({
                channel: 'msedge',
                headless: false
            });

        } else if (browserName === 'firefox') {

            browser = await firefox.launch({
                headless: false
            });

        } else {

            throw new Error(`Unsupported browser: ${browserName}`);
        }

        const context: BrowserContext = await browser.newContext({
            viewport: {
                width: 1280,
                height: 720 
            }
        });

        const browserPage: Page = await context.newPage();

        await browserPage.goto(env.App_URL);

        // Give browserPage to the test
        await use(browserPage);

        // Cleanup
        await browser.close();
    }
});

test.beforeAll(async () => {
    console.log('Before all');
});

test.beforeEach(async () => {
    console.log('Before each');
});

test.afterEach(async () => {
    console.log('After each');
});

test.afterAll(async () => {
    console.log('After all');
});