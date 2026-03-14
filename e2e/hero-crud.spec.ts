import { test, expect } from '@playwright/test';

test.describe('Hero CRUD', () => {
  test('creates a new hero and it appears in the list', async ({ page }) => {
    await page.goto('/heroes/list');
    await page.waitForSelector('.card');
    const countBefore = await page.locator('.card').count();

    await page.getByRole('button', { name: 'Nuevo héroe' }).click();
    await expect(page).toHaveURL('/heroes/new');

    await page.fill('input[formcontrolname="superhero"]', 'Test Hero');
    await page.fill('input[formcontrolname="alterEgo"]', 'Test Alter Ego');
    await page.fill('input[formcontrolname="firstAppearance"]', 'Test #1');

    // Añadir al menos un creador (campo requerido para poder guardar)
    const originatorInput = page.locator('input[placeholder*="creador"]').or(
      page.locator('input[placeholder*="Creador"]')
    );
    await originatorInput.fill('Stan Lee');
    await originatorInput.press('Enter');

    await page.getByRole('button', { name: 'Crear héroe' }).click();
    await page.waitForURL('/heroes/list');
    await page.waitForSelector('.card');

    const countAfter = await page.locator('.card').count();
    expect(countAfter).toBe(countBefore + 1);
  });

  test('edits an existing hero', async ({ page }) => {
    // Crear un héroe propio para tener datos controlados
    await page.goto('/heroes/new');
    await page.fill('input[formcontrolname="superhero"]', 'Hero To Edit');
    await page.fill('input[formcontrolname="alterEgo"]', 'Edit Alter Ego');
    await page.fill('input[formcontrolname="firstAppearance"]', 'Edit #1');
    const originatorInput = page.locator('input[placeholder*="reador"]').first();
    await originatorInput.fill('Stan Lee');
    await originatorInput.press('Enter');
    await page.getByRole('button', { name: 'Crear héroe' }).click();
    await page.waitForURL('/heroes/list');

    // Abrir el héroe recién creado por su título
    await page.getByText('Hero To Edit').click();
    await page.waitForSelector('.detail-toolbar');

    await page.getByRole('button', { name: 'Editar' }).click();
    await expect(page).toHaveURL(/\/heroes\/edit\/.+/);
    await expect(page.locator('h1')).toContainText('Editar héroe');

    // El form carga con datos del héroe: el botón debería estar habilitado
    const saveButton = page.getByRole('button', { name: 'Guardar cambios' });
    await expect(saveButton).toBeEnabled({ timeout: 10000 });

    await page.fill('input[formcontrolname="superhero"]', 'Hero Edited');
    await saveButton.click();

    // Después de editar navega al detalle del héroe
    await page.waitForURL(/\/heroes\/.+/);
    await expect(page.locator('h1, .hero-name, app-hero-info-cards')).toBeVisible({ timeout: 5000 });
  });

  test('deletes a hero and it disappears from the list', async ({ page }) => {
    await page.goto('/heroes/list');
    await page.waitForSelector('.card');
    const countBefore = await page.locator('.card').count();

    await page.locator('.card').first().click();
    await page.waitForSelector('.detail-toolbar');

    // Aceptar el confirm() nativo antes de que aparezca
    page.on('dialog', (dialog) => dialog.accept());
    await page.getByRole('button', { name: 'Eliminar' }).click();

    await page.waitForURL('/heroes/list');
    await page.waitForSelector('.heroes-container');

    const countAfter = await page.locator('.card').count();
    expect(countAfter).toBe(countBefore - 1);
  });
});
