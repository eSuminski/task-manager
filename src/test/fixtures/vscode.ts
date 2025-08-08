import { test as base, expect } from '@playwright/test';
import { chromium, Browser, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Additional fixtures injected into Playwright tests for VS Code automation.
 *
 * - vscodeBrowser: a CDP-connected Chromium Browser instance representing the VS Code Electron app.
 * - vscodePage: the main VS Code window (first Page), awaited until the workbench is visible.
 */
type Fixtures = {
  vscodeBrowser: Browser;
  vscodePage: Page;
};

/**
 * Extends the base Playwright test with fixtures that connect to a VS Code instance
 * launched by globalSetup. The websocket endpoint is read from env or the
 * persisted automation info file.
 */
export const test = base.extend<Fixtures & {reloadWindow: void}>({
  /**
   * Connects to the running VS Code Electron via Chromium CDP.
   *
   * Source of truth for the endpoint:
   * 1) PW_VSCODE_WS_ENDPOINT env var (set by globalSetup)
   * 2) test/.vscode-automation.json file (path via PW_VSCODE_INFO)
   *
   * The browser connection is shared across tests and not closed here; globalTeardown
   * will terminate the VS Code process.
   */
  vscodeBrowser: async ({}, use) => {
    let endpoint = process.env.PW_VSCODE_WS_ENDPOINT;
    if (!endpoint) {
      const infoPath = process.env.PW_VSCODE_INFO || path.resolve(__dirname, '../.vscode-automation.json');
      const info = JSON.parse(fs.readFileSync(infoPath, 'utf-8'));
      endpoint = info.wsEndpoint as string;
    }
    const browser = await chromium.connectOverCDP(endpoint!);
    await use(browser);
    // Do not close here; global teardown will terminate VS Code
  },

  /**
   * Produces the main VS Code window page and waits for the workbench to be visible,
   * ensuring the UI is ready for interactions and assertions.
   */
  vscodePage: async ({ vscodeBrowser }, use) => {
    const [context] = vscodeBrowser.contexts();
    let page = context.pages()[0];
    if (!page) {
      page = await context.waitForEvent('page', { timeout: 60_000 });
    }
    await page.waitForSelector('.monaco-workbench', { state: 'visible', timeout: 2000 });

    await use(page);
  },

  /**
   * Auto fixture that reloads the VS Code window before each test.
   *
   * Invokes the "Developer: Reload Window" command via the Command Palette,
   * ensuring a fresh workbench state for every test. This helps isolate test
   * side effects and improves reliability when testing VS Code extensions.
   *
   * The reload is performed before each test automatically; no value is injected.
   */
  reloadWindow: [
    async ({ vscodePage }, use) => {
      // Open Command Palette and run Developer: Reload Window
      await vscodePage.keyboard.press('ControlOrMeta+Shift+P');
      const input = vscodePage.getByRole('textbox', { name: /command/i });
      await input.waitFor({ state: 'visible' });
      await input.fill('Developer: Reload Window');
      await vscodePage.keyboard.press('Enter');
      // Wait for the workbench to reload
      await vscodePage.waitForSelector('.monaco-workbench', { state: 'visible'});
      await use(undefined);
    },
    { auto: true }
  ],
});

export { expect };
