import { test, expect } from '@playwright/test';

test('renders the chat shell and sends a mock message', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('button', { name: 'New chat' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Message' })).toBeVisible();

  await page.getByRole('textbox', { name: 'Message' }).fill('Hello ng-chat');
  await page.getByRole('button', { name: 'Send message' }).click();

  await expect(page.getByText('Hello ng-chat')).toBeVisible();
  await expect(page.getByText('Mock response:')).toBeVisible();
});
