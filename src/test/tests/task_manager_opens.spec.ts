import { expect } from '@playwright/test';
import { test } from '../fixtures/vscode';
import { VscHomePage } from '../poms/home';


test('opens Task Manager via Command Palette', async ({ vscodePage }) => {
  // await vscodePage.pause();

  const home = new VscHomePage(vscodePage);

  await home.openCommandPalette();

  await home.openTaskManager();

  await expect(home.taskManagerTab).toBeVisible();
});