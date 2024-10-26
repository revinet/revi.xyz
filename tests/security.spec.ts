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

test('Check security page', async ({page}) => {
  // Go to the security page.
  await page.goto('https://revi.xyz/security/');

  // Check if the security page is accessible.
  await expect(page.getByText('Unlisted page')).toBeVisible();
  // Click section name to verify the content.
  await expect(page.getByRole('article')).toContainText(
    'Only after the patch is generally available',
  );
  // Check the content of the page.
  await expect(page.getByRole('article')).toContainText(
    'After reading above, if you are still certain if you discovered a security bug that falls within MY responsibility, then contact me.',
  );
  // Check the content of the page in <pre> texts.
  await expect(page.locator('pre')).toContainText('blanc.security.revi.xyz');
});

test('Click security.txt', async ({page}) => {
  // Go to the security page.
  await page.goto('https://revi.xyz/security/');
  // Click the security.txt link.
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', {name: 'security.txt'}).click();
  // Wait for security.txt to load.
  const page1 = await page1Promise;
  // Check if the security.txt page has correct contents.
  await expect(page1.locator('pre')).toContainText(
    'Policy: https://revi.xyz/security/',
  );
});
