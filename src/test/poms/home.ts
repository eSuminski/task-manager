import { Page, Locator, FrameLocator, Frame } from '@playwright/test';
import { resolve } from 'path';
import { TaskManagerPage } from './task_manager';

export class VscHomePage {

  // Locators
  readonly commandPaletteInput: Locator;

  constructor(private readonly page: Page) {
    this.commandPaletteInput = this.page.getByRole('textbox', {
      name: 'Type the name of a command to',
    });
  }

  /**
   * Resolve the Task Manager webview frame by locating the iframe that contains
   * our root marker element.
   */
async getTaskManagerFrame(): Promise<Frame> {
  const pollInterval = 200;
  const deadline = Date.now() + 5000; // 5 seconds timeout
  
  while (Date.now() < deadline) {
    for (const frame of this.page.frames()) {
      if (frame === this.page.mainFrame()) continue; // Skip main frame
      const count = await frame.locator('div[data-testid="taskManagerRoot"]').count();
      if (count > 0) {
        return frame;
      }
    }
    await new Promise(resolve => setTimeout(resolve, pollInterval));
  }
  throw new Error('Timed out waiting for Task Manager frame');
}

  async listFrames(): Promise<void> {
    for (const frame of this.page.frames()) {
      console.log(`Found frame: ${await frame.title()}`);
      console.log(`Frame URL: ${frame.url()}`);
      console.log();
    }
  }

  async openCommandPalette(): Promise<void> {
    // Focus editor if the empty state is present (matches codegen path)
    const editor = this.page.getByLabel('Editor Group 1 (empty)');
    if (await editor.count()) {
      await editor.click({ force: true });
    }
    await this.page.keyboard.press('ControlOrMeta+Shift+P');
    await this.commandPaletteInput.waitFor({ state: 'visible' });
  }

  async runCommand(label: string): Promise<void> {
    await this.openCommandPalette();
    await this.commandPaletteInput.fill(`>${label}`);
    // Wait for the command palette to finish filtering and show the command
    const item = this.page.getByRole('option', { name: label }).first();
    await item.waitFor({ state: 'visible', timeout: 5000 });
    await item.click();
  }

  async openTaskManager(): Promise<void> {
    if (await this.isTaskManagerOpen()) {
      console.log('Task Manager already open, skipping...');
      return;
    }
    console.log('Opening Task Manager');
    await this.runCommand('Open Task Manager');
  }

  async isTaskManagerOpen(): Promise<boolean> {
    for (const frame of this.page.frames()) {
      if (frame === this.page.mainFrame()) continue;
      const count = await frame.locator('div[data-testid="taskManagerRoot"]').count();
      if (count > 0) return true;
    }
    return false;
  }

  async reloadVSCWindow(): Promise<void> {
    console.log(`Reloading VS Code window`);
    await this.runCommand('Developer: Reload Window');
    await this.page.waitForSelector('.monaco-workbench', { state: 'visible' });
  }
}