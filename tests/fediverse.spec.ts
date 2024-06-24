import {test, expect} from '@playwright/test';

test('Check fediverse page', async ({page}) => {
  await page.goto('/');

  // Go to the fediverse account list page
  await page.getByRole('button', {name: 'other sites'}).click();
  await page
    .getByRole('link', {name: 'fediverse accounts', exact: true})
    .click();
  // Expect the page title to be there.
  await expect(
    page.getByRole('heading', {name: 'revi at fediverse'}),
  ).toBeVisible();
  // Expect the page to have the note for English speakers.
  await expect(page.getByText('Note for English speakerIf')).toBeVisible();
  // Expect the page to have the Description.
  await expect(page.getByRole('article')).toContainText(
    /This is revi\'s mastodon account index\./,
  );
  // Expect the page to have the list of accounts.
  await expect(
    page.locator('li').filter({hasText: '한국어, 본 계정'}).getByRole('link'),
  ).toBeVisible();
  await expect(
    page
      .locator('li')
      .filter({hasText: 'English, main account'})
      .getByRole('link'),
  ).toBeVisible();
});
