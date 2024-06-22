import {test, expect} from '@playwright/test';

test('has title', async ({page}) => {
  await page.goto('https://revi.xyz/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/revi/);
  await page.getByRole('heading', {name: 'revi'}).click();
  await expect(page.getByRole('article')).toContainText(
    'A random internet nerd editing Wikipedia and dealing with spammers.',
  );
  await page.getByText('Click to open webring links').click();
  await expect(page.getByRole('group')).toContainText('IndieWeb Webring');
});

test('contact method link', async ({page}) => {
  await page.goto('https://revi.xyz/');

  // Click the contact-method link.
  await page.getByRole('link', {name: 'this guide'}).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', {name: 'Email'})).toBeVisible();
});
