import { expect } from '@playwright/test';
import { test } from '../fixtures/vscode';
import { VscHomePage } from '../poms/home';


test.describe('Basic Task Manager features should be present', () => {

  test.afterEach('reload the vsc window', async ({ vscodePage }) => {
    const home = new VscHomePage(vscodePage);
    await home.reloadVSCWindow();
  });

  test('opens Task Manager via Command Palette', async ({ vscodePage }) => {

    const home = new VscHomePage(vscodePage);

    await home.openTaskManager();

    const taskManagerFrame = await home.getTaskManagerFrame();

    expect(taskManagerFrame).not.toBeNull();

  });  

  test('create task card is present in task manager', async ({ vscodePage }) => {

    const home = new VscHomePage(vscodePage);

    await home.openTaskManager();

    const taskManagerFrame = await home.getTaskManagerFrame();

    await expect(taskManagerFrame.locator('div[data-testid="createCard"]')).toBeVisible();
  });

});
