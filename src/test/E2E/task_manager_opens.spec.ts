import { expect } from '@playwright/test';
import { test } from '../fixtures/vscode';
import { VscHomePage } from '../poms/home';


test.describe('Basic Task Manager features should be present', () => {

  test('opens Task Manager via Command Palette', async ({ vscodePage }) => {

    const home = new VscHomePage(vscodePage);

    await home.openTaskManager();

    await expect(home.taskManagerTab).toBeVisible();

    await home.listFrames();
  });  

  test('create task card is present in task manager', async ({ vscodePage }) => {

    const home = new VscHomePage(vscodePage);

    await home.reloadVSCWindow();

    await home.openTaskManager();

    // await expect(home.taskManagerTab).toBeVisible();

    const frame = await home.getTaskManagerFrame();

    await expect(frame.locator('div[data-testid="createCard"]')).toBeVisible();
  });

});

