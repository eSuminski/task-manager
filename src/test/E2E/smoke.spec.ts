
import { expect } from '@playwright/test';
import { test } from '../fixtures/vscode';

/**
 * Smoke tests verifying that a VS Code window is launched by globalSetup
 * and is reachable via the shared Playwright fixtures.
 */

test.describe('VS Code Extension Automation Smoke Tests', () => {
  /**
   * Ensures Playwright is connected to the running VS Code instance and
   * the core UI (monaco workbench) is rendered and interactive.
   */
  test('should connect to the VS Code instance', async ({ vscodePage }) => {
    expect(vscodePage).toBeTruthy();
    const workbench = await vscodePage.$('.monaco-workbench');
    expect(workbench).toBeTruthy();
  });

});
