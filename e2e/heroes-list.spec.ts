import { test, expect } from '@playwright/test';

test.describe('Heroes list', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/heroes/list');
    await page.waitForSelector('.card', { timeout: 10000 });
  });

  test('shows hero list with at least one card', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Héroes');
    await expect(page.locator('.card').first()).toBeVisible();
  });

  test('search filter narrows results', async ({ page }) => {
    const totalBefore = await page.locator('.card').count();

    await page.fill('input[placeholder*="Buscar"]', 'bat');
    await page.waitForTimeout(300);

    const totalAfter = await page.locator('.card').count();
    expect(totalAfter).toBeLessThan(totalBefore);
  });

  test('search term appears in URL query params', async ({ page }) => {
    await page.fill('input[placeholder*="Buscar"]', 'batman');
    await page.waitForTimeout(300);

    expect(page.url()).toContain('search=batman');
  });

  test('publisher filter shows only matching heroes', async ({ page }) => {
    await page.getByRole('button', { name: 'DC Comics' }).click();
    await page.waitForTimeout(300);

    expect(decodeURIComponent(page.url())).toContain('publisher=DC Comics');
    await expect(page.locator('.card').first()).toBeVisible();
  });

  test('clear all filters restores full list', async ({ page }) => {
    await page.fill('input[placeholder*="Buscar"]', 'bat');
    await page.waitForTimeout(300);
    const filtered = await page.locator('.card').count();

    await page.getByRole('button', { name: 'Limpiar todo' }).click();
    await page.waitForTimeout(300);
    const restored = await page.locator('.card').count();

    expect(restored).toBeGreaterThan(filtered);
  });

  test('navigates to hero detail on card click', async ({ page }) => {
    await page.locator('.card').first().click();
    await expect(page).toHaveURL(/\/heroes\/.+/);
  });

  test('back button from detail preserves filters', async ({ page }) => {
    await page.fill('input[placeholder*="Buscar"]', 'bat');
    await page.waitForTimeout(300);

    await page.locator('.card').first().click();
    await page.waitForSelector('.detail-toolbar');

    await page.getByRole('button', { name: 'Volver al listado' }).click();
    await page.waitForSelector('.card');

    expect(page.url()).toContain('search=bat');
  });
});
