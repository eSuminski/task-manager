import { defineConfig, devices } from '@playwright/test';
import path from 'path';

export default defineConfig({
  testDir: './src/test',
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