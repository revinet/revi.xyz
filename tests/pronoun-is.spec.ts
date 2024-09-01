/*
 * SPDX-FileCopyrightText: (C) 2024 Hong Yongmin (https://revi.xyz/) <yewon@revi.email>
 * SPDX-FileContributor: Microsoft Corporation
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
    /What should I use to reference you?/,
  );
  await expect(page.getByText(/What should I use to reference/)).toBeVisible();
  await expect(page.getByRole('article')).toContainText(
    /By default\, use he\/him\./,
  );
  await expect(page.getByText(/Korean language does not make/)).toBeVisible();
  await expect(page.getByRole('article')).toContainText(
    /This means it might be confusing both to me and to you\./,
  );
  await page.getByText(/my pronouns\.page profile interpretation\:/).click();
});

test('Verify old URL redirects', async ({page}) => {
  // Go to old URL.
  await page.goto('/gender-pronounciation/');
  // Expect the contents to be visible.
  await expect(page.getByText(/What should I use to reference/)).toBeVisible();
  await expect(page.getByRole('article')).toContainText(
    /By default\, use he\/him\./,
  );
  // await expect(page).toHaveURL('/pronoun-is/');
});
