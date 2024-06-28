// SPDX-FileCopyrightText: 2024 Hong Yongmin <https://revi.xyz/>
//
// SPDX-License-Identifier: Apache-2.0
import {test, expect} from '@playwright/test';

test('Check gender pronounce page', async ({page}) => {
  await page.goto('/');

  // Check if the gender pronounce page is accessible
  await expect(page.getByText('he/him unless otherwise noted.')).toBeVisible();
  await page.getByRole('link', {name: 'he/him unless otherwise noted'}).click();
  // Verify the page title and content
  await expect(
    page.getByRole('heading', {name: 'What should I use to'}),
  ).toBeVisible();
  await expect(page.locator('h1')).toContainText(
    /What should I use to reference you\? he\? she\?/,
  );
  await expect(
    page.getByText(
      /What should I use to reference you\? he\? she\? my pronouns.page profile/,
    ),
  ).toBeVisible();
  await expect(page.getByRole('article')).toContainText(
    /By default\, use he\/him\./,
  );
  await expect(page.getByText(/Korean language does not make/)).toBeVisible();
  await expect(page.getByRole('article')).toContainText(
    /This means it might be confusing both to me and to you\./,
  );
  await page.getByText(/my pronouns\.page profile interpretation\:/).click();
});
