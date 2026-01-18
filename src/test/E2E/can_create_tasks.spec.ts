import { expect } from '@playwright/test';
import { test } from '../fixtures/vscode';
import { VscHomePage } from '../poms/home';
import { TaskManagerPage } from '../poms/task_manager';

test.describe('Can create tasks in Task Manager', () => {

    test.beforeEach('Open Task Manager', async ({vscodePage})=> {
        const home = new VscHomePage(vscodePage);
        await home.openTaskManager();
    });

    test.afterEach('reload the vsc window', async ({ vscodePage }) => {
        const home = new VscHomePage(vscodePage);
        await home.reloadVSCWindow();
    });

    test('can create a task with title and description', async ({ vscodePage }) => {
        const home = new VscHomePage(vscodePage);
        const taskManager = new TaskManagerPage(vscodePage, await home.getTaskManagerFrame());

        const taskTitle = 'E2E Test Task Title';
        const taskDescription = 'E2E Test Task Description';

        await taskManager.fillTitle(taskTitle);
        await taskManager.fillDescription(taskDescription);
        await taskManager.clickAddTask();

        await expect(taskManager.getTaskCardTitle(taskTitle)).toBeVisible();
        await expect(taskManager.getTaskCardDescription(taskDescription)).toBeVisible();

    });

    test('can create a task with subtasks', async ({ vscodePage }) => {
        const home = new VscHomePage(vscodePage);
        const taskManager = new TaskManagerPage(vscodePage, await home.getTaskManagerFrame());  
        const taskTitle = 'E2E Test Task with Subtasks';
        const taskDescription = 'E2E Test Task Description with Subtasks';
        const subtask1 = 'First Subtask';
        const subtask2 = 'Second Subtask';
        await taskManager.fillTitle(taskTitle);
        await taskManager.fillDescription(taskDescription);
        await taskManager.fillSubtask(subtask1);
        await taskManager.clickAddSubtask();
        await taskManager.fillSubtask(subtask2, 1);
        await taskManager.clickAddTask();

        await expect(taskManager.getTaskCardTitle(taskTitle)).toBeVisible();
        await expect(taskManager.getTaskCardSubtask(subtask1)).toBeVisible();
        await expect(taskManager.getTaskCardSubtask(subtask2)).toBeVisible();
    });

    test('can remove subtasks after adding them as part of the creation process', async ({ vscodePage }) => {
        const home = new VscHomePage(vscodePage);
        const taskManager = new TaskManagerPage(vscodePage, await home.getTaskManagerFrame());  
        const taskTitle = 'E2E Test Task with Removed Subtask';
        const taskDescription = 'E2E Test Task Description with Removed Subtask';
        const subtask1 = 'Subtask to Keep';
        const subtask2 = 'Subtask to Remove';
        await taskManager.fillTitle(taskTitle);
        await taskManager.fillDescription(taskDescription);
        await taskManager.fillSubtask(subtask1);
        await taskManager.clickAddSubtask();
        await taskManager.fillSubtask(subtask2, 1);
        await taskManager.clickRemoveSubtask(1);
        await taskManager.clickAddTask();

        await expect(taskManager.getTaskCardTitle(taskTitle)).toBeVisible();
        await expect(taskManager.getTaskCardSubtask(subtask1)).toBeVisible();
        await expect(taskManager.getTaskCardSubtask(subtask2)).not.toBeVisible();
    });

});