import { expect } from '@playwright/test';
import { test } from '../fixtures/vscode';

test('record user actions for fast test prototyping', async ({ vscodePage }) => {
    // actions taken after pause can be used for quickly creating tests
    await vscodePage.pause();
});
