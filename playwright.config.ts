import { defineConfig, devices } from '@playwright/test';
import path from 'path';

const REPORT_FOLDER = process.env.REPORT_FOLDER || 'test-results';
const REPORT_TITLE = process.env.REPORT_TITLE || 'Test Report';

export default defineConfig({
  reporter: [
    ['html', { outputFolder: REPORT_FOLDER, title: REPORT_TITLE }],  ],
  testDir: './src/test',
  outputDir: REPORT_FOLDER,
  timeout: 5000,
  retries: 0,
  workers: 1, // one VS Code window shared across tests
  use: {
    browserName: 'chromium',
    headless: true,
    trace: 'on-first-retry',
    ...devices['Desktop Chrome'],
  },
  globalSetup: path.resolve(__dirname, 'src/test/global/global-setup.ts'),
  globalTeardown: path.resolve(__dirname, 'src/test/global/global-teardown.ts'),
});