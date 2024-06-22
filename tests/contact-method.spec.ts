import {test, expect} from '@playwright/test';

test('Check headings', async ({page}) => {
  // Connect to main page.
  await page.goto('https://revi.xyz/');

  // Click the contact-method link to go to /contact-method/ page.
  await page.getByRole('link', {name: 'this guide'}).click();

  // Expects page to have a heading with the name of "Email"
  await expect(page.getByRole('heading', {name: 'Email'})).toBeVisible();

  // Expect a link "LizardIRC" to be visible.
  await expect(page.getByRole('link', {name: 'LizardIRC'})).toBeVisible();
  // Expect a heading "Telegram/Signal" to be visible.
  await page
    .getByRole('heading', {name: 'Telegram/SignalDirect link to'})
    .click();
  await page.getByLabel('Direct link to Telegram/Signal').click();
  // Expect a heading "Telegram" to be visible.
  await expect(
    page.getByRole('heading', {name: 'TelegramDirect link to'}),
  ).toBeVisible();
});

test('Click email tabs', async ({page}) => {
  // Connect to the contact method pages.
  await page.goto('https://revi.xyz/contact-method/');

  // Expects page to have a text with the content of "liame.lolgmo@iver"
  await page.getByRole('tab', {name: 'general'}).click();
  await expect(page.locator('pre')).toContainText('liame.lolgmo@iver');
  // Expect page to have a text with the content of "ikiw.iver@iver"
  await page.getByRole('tab', {name: 'wiki'}).click();
  await expect(page.locator('pre')).toContainText('ikiw.iver@iver');
});
