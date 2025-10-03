import { test, expect } from '@playwright/test';

test('table filter', async ({ page }) => {
  await page.goto('http://localhost:4200/p/P01');
  await page.waitForTimeout(2000);
  await page.fill('input[aria-label="Filtre"]', 'Fund A');
  const firstRow = page.locator('tr.mat-mdc-row').first();
  await expect(firstRow).toContainText('Fund A', { timeout: 10000 });
});


test('navigate to another portfolio', async ({page}) => {
  await page.goto('http://localhost:4200/p/P02');
  await page.waitForTimeout(3000);
  const firstRow = page.locator('tr.mat-mdc-row').first();
  await expect(firstRow).toContainText('ETF D');
});