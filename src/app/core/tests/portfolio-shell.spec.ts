import { test, expect } from '@playwright/test';

test('filtre table', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.fill('input[aria-label="Filtre"]', 'Fund A');
  const firstRow = page.locator('tr.mat-row').first();
  await expect(firstRow).toContainText('Fund A');
});