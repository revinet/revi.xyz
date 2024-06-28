// SPDX-FileCopyrightText: 2024 Hong Yongmin <https://revi.xyz/>
//
// SPDX-License-Identifier: Apache-2.0
import {test, expect} from '@playwright/test';

test('Has title', async ({page}) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/revi/);
  await page.getByRole('heading', {name: 'revi'}).click();
});

test('Has expected page texts', async ({page}) => {
  await page.goto('/');

  // Expect the text to be there.
  await expect(page.getByRole('article')).toContainText(
    'A random internet nerd editing Wikipedia and dealing with spammers.',
  );
  // Expect the webling box to be clickable (and opened when clicked)
  await page.getByText('Click to open webring links').click();
  // Expect the webling box to have a text "IndieWeb Webring"
  await expect(page.getByRole('group')).toContainText('IndieWeb Webring');
});
