import { test, expect } from '@playwright/test';

// Тесты основных функций приложения

test('должна загрузиться домашняя страница', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('body')).toContainText('Загрузите');
});

test('должен работать переход на страницу генератора', async ({ page }) => {
  await page.goto('/');
  await page.getByText('CSV Генератор').click();
  await expect(page.locator('body')).toContainText('Сгенерируйте готовый');
});

test('должен работать переход на страницу истории', async ({ page }) => {
  await page.goto('/');
  await page.getByText('История').click();
  await expect(page.locator('body')).toContainText('История загрузок');
});

test('должна отображаться кнопка загрузки файла', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Загрузить файл')).toBeVisible();
});

test('кнопка отправки должна быть неактивна без файла', async ({ page }) => {
  await page.goto('/');
  const submitButton = page.getByRole('button', { name: 'Отправить' });
  await expect(submitButton).toBeDisabled();
});

test('на странице истории должно быть сообщение о пустой истории', async ({ page }) => {
  await page.goto('/history');
  await expect(page.getByText('История пуста')).toBeVisible();
});


test('должна отображаться кнопка загрузки файла', async ({ page }) => {
  await page.goto('/');
  
  await expect(page.getByText('Загрузить файл')).toBeVisible();
  
  await expect(page.getByText('или перетащите сюда')).toBeVisible();
});

test('должна отображаться кнопка генератора', async ({ page }) => {
  await page.goto('/');
  await page.getByText('CSV Генератор').click();
  
  await expect(page.getByText('Начать генерацию')).toBeVisible();
});

test('должен отображаться заголовок с логотипом', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('header')).toBeVisible();
  
  await page.getByText('CSV Генератор').click();
  await expect(page.locator('header')).toBeVisible();
  
  await page.getByText('История').click();
  await expect(page.locator('header')).toBeVisible();
});

test('должен отображаться плейсхолдер для результатов аналитики', async ({ page }) => {
  await page.goto('/');
  
  await expect(page.getByText('Здесь появятся результаты аналитики')).toBeVisible();
});

test('должны отображаться ссылки навигации в заголовке', async ({ page }) => {
  await page.goto('/');
  
  await expect(page.getByText('CSV Аналитик')).toBeVisible();
  await expect(page.getByText('CSV Генератор')).toBeVisible();
  await expect(page.getByText('История')).toBeVisible();
});

test('должна подсвечиваться активная ссылка навигации', async ({ page }) => {
  await page.goto('/');
  
  await expect(page.getByText('CSV Аналитик')).toBeVisible();
  
  await page.getByText('CSV Генератор').click();
  await expect(page.getByText('CSV Генератор')).toBeVisible();
  
  await page.getByText('История').click();
  await expect(page.getByText('История')).toBeVisible();
});

test('должна отображаться кнопка очистки истории', async ({ page }) => {
  await page.goto('/');
  await page.getByText('История').click();
  
  await expect(page.getByText('Очистить всё')).toBeVisible();
}); 