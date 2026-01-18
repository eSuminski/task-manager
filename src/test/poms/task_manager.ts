import { Frame, FrameLocator, Locator, Page } from "playwright";

export class TaskManagerPage {

    // Locators

    // Task Creation
    readonly rootFrame: Frame;
    readonly titleCreateInput: Locator;
    readonly descriptionCreateInput: Locator;
    readonly subtaskCreateinput: Locator; // Note: extra subtask inputs can be created during tests
    readonly subtaskDeleteButton: Locator; // Note: extra subtask delete buttons can be created during tests
    readonly subtaskCreateButton: Locator;
    readonly addTaskButton: Locator;

    // Task Card
    taskCard: (selectorFunction: (text: string) => Locator, text: string) => Locator; // Generic function to get a task card by a child locator
    readonly taskCardTitle: (title: string) => Locator;
    readonly taskCardDescription: (description: string) => Locator;
    readonly taskCardSubtask: (subtask: string) => Locator; // Note: extra subtasks can be created during tests
    readonly taskCardSubtaskCheckbox: (index: number) => Locator; // Note: extra subtask checkboxes can be created during tests
    readonly taskCardCompleteButton: (index: number) => Locator; // TODO: implement
    readonly taskCardDeleteButton: (index: number) => Locator; // TODO: implement
    

    public constructor(page: Page, frame: Frame){
        // root iframe of the Task Manager webview
        this.rootFrame = frame;

        // Task Creation locators
        this.titleCreateInput = this.rootFrame.getByRole('textbox', {name:'Task Title'});
        this.descriptionCreateInput = this.rootFrame.getByRole('textbox', {name:'Task Description'});
        this.subtaskCreateinput = this.rootFrame.getByRole('textbox', {name:'Subtask'});
        this.subtaskDeleteButton = this.rootFrame.getByRole('button', {name:'Remove subtask'});
        this.subtaskCreateButton = this.rootFrame.getByRole('button', {name:'+'});
        this.addTaskButton = this.rootFrame.getByRole('button', {name:'Add Task'});

        // Task Card locators
        this.taskCard = (selectorFunction: (text: string) => Locator, text: string) => {
            return this.rootFrame.locator('div.task-card').filter({ has: selectorFunction(text) });
        };
        this.taskCardTitle = (title: string) => this.rootFrame.getByText(title, {exact:true});
        this.taskCardDescription = (description: string) => this.rootFrame.getByText(description, {exact:true});
        this.taskCardSubtask = (subtask: string) => this.rootFrame.getByText(subtask, {exact:true});
        this.taskCardSubtaskCheckbox = (index: number) => this.rootFrame.locator('input[type="checkbox"]').nth(index);
        this.taskCardCompleteButton = (index: number) => this.rootFrame.getByRole('button', {name:'Complete Task'}).nth(index);
        this.taskCardDeleteButton = (index: number) => this.rootFrame.getByRole('button', {name:'Delete Task'}).nth(index);

    }

    /***********************************CREATE TASK***********************************/

    // Methods for filling text inputs
    async fillTitle(title: string): Promise<void> {
        await this.titleCreateInput.fill(title);
    }

    async fillDescription(description: string): Promise<void> {
        await this.descriptionCreateInput.fill(description);
    }

    async fillSubtask(text: string, index: number = 0): Promise<void> {
        await this.subtaskCreateinput.nth(index).fill(text);
    }

    // Methods for clicking buttons
    async clickAddSubtask(): Promise<void> {
        await this.subtaskCreateButton.click();
    }

    async clickRemoveSubtask(index: number = 0): Promise<void> {
        await this.subtaskDeleteButton.nth(index).click();
    }

    async clickAddTask(): Promise<void> {
        await this.addTaskButton.click();
    }

    /***********************************TASK CARD***********************************/

    // Methods for getting task cards

    getTaskCardByTitle(title: string): Locator {
        return this.taskCard(this.taskCardTitle, title);
    }

    getTaskCardByDescription(description: string): Locator {
        return this.taskCard(this.taskCardDescription, description);
    }

    getTaskCardBySubtask(subtask: string): Locator {
        return this.taskCard(this.taskCardSubtask, subtask);
    }

    // Methods for checking task card elements

    getTaskCardTitle(title: string): Locator {
        return this.taskCardTitle(title);
    }

    getTaskCardDescription(description: string): Locator {
        return this.taskCardDescription(description);
    }

    getTaskCardSubtask(subtask: string): Locator {
        return this.taskCardSubtask(subtask);
    }

    async isTaskCardSubtaskCompleted(index: number): Promise<boolean> {
        return await this.taskCardSubtaskCheckbox(index).isChecked();
    }

    // Methods for interacting with task card elements

    async toggleTaskCardSubtaskCheckbox(index: number): Promise<void> {
        await this.taskCardSubtaskCheckbox(index).click();
    }

    async clickTaskCardCompleteButton(index: number): Promise<void> {
        await this.taskCardCompleteButton(index).click();
    }

    async clickTaskCardDeleteButton(index: number): Promise<void> {
        await this.taskCardDeleteButton(index).click();
    }
}