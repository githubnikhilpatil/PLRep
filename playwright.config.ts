import { defineConfig,devices  } from '@playwright/test';
import path from 'path';
import { createExecutionFolder } from './utils/ExecutionFolder';

const executionFolder = createExecutionFolder();

process.env.ALLURE_EXECUTION_FOLDER = executionFolder;

const allureResultsFolder = path.join(
    executionFolder,
    'temp-results'
);

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  workers: 8,
  retries: 0,
//globalTeardown: './global-teardown.ts',
    reporter: [
        [ 'allure-playwright',
            {
               resultsDir: 'allure-results',
                detail: false
            }]
    ],
  use: {
    headless: false,
    screenshot: 'only-on-failure',
    viewport: { width: 1280, height: 720 },
    actionTimeout: 0,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
