import { Page, Locator } from '@playwright/test';

export class VscHomePage {
  constructor(private readonly page: Page) {
    this.commandPaletteInput = this.page.getByRole('textbox', {
      name: 'Type the name of a command to',
    });
    this.taskManagerTab = this.page.getByText('Task Manager', { exact: true });
  }

  // Locators
  readonly commandPaletteInput: Locator;
  readonly taskManagerTab: Locator;

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
    const item = this.page.locator('a').filter({ hasText: label });
    await item.first().click();
  }

  async openTaskManager(): Promise<void> {
    await this.runCommand('Open Task Manager');
  }
}