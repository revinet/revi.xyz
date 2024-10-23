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

test('Check pgp page', async ({page}) => {
  // Go to the pgp page.
  await page.goto('https://revi.xyz/pgp/');

  // Check if key 1 is visible.
  await expect(page.getByText('947F 156F 1625 0DE3 9788 C3C3')).toBeVisible();
  // Check if key 1 is correct.
  await expect(page.getByRole('article')).toContainText('947F 156F 1625 0DE3 9788 C3C3 5B62 5DA5 BEFF 197A');
  // Check if key 2 is visible.
  await expect(page.getByText('12DD 5306 418C 8E0A 8F55 761D')).toBeVisible();
  // Check if key 2 is correct.
  await expect(page.getByRole('article')).toContainText('12DD 5306 418C 8E0A 8F55 761D 1EB4 F6CE EA10 0E94');
});

test('Click key 1 (local)', async ({page}) => {
  // Go to the pgp page.
  await page.goto('https://revi.xyz/pgp/');
  // Click key 1.
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '947F156F16250DE39788C3C35B625DA5BEFF197A' }).click();
  // Wait for key 1 to load.
  const page1 = await page1Promise;
  // Check if key 1 has correct contents.
  await expect(page1.locator('pre')).toContainText('Version: GnuPG v1');
});

test('Click key 1 (ubuntu)', async ({page}) => {
  // Go to the pgp page.
  await page.goto('https://revi.xyz/pgp/');
  // Click key 1.
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Get from keyserver.ubuntu.com' }).first().click();
  // Wait for key 1 to load.
  const page2 = await page2Promise;
  // Check if key 1 has correct contents.
  await expect(page2.locator('body')).toContainText('yongminh@wikimedia.org');
});

test('Click key 2 (local)', async ({page}) => {
  // Go to the pgp page.
  await page.goto('https://revi.xyz/pgp/');
  // Click key 2.
  const page3Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '12DD5306418C8E0A8F55761D1EB4F6CEEA100E94' }).click();
  // Wait for key 2 to load.
  const page3 = await page3Promise;
  // Check if key 2 has correct contents.
  await expect(page3.locator('pre')).toContainText('-----END PGP PUBLIC KEY BLOCK-----');
});

test('Click key 2 (ubuntu)', async ({page}) => {
  // Go to the pgp page.
  await page.goto('https://revi.xyz/pgp/');
  // Click key 2.
  const page4Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Get from keyserver.ubuntu.com' }).nth(1).click();
  // Wait for key 2 to load.
  const page4 = await page4Promise;
  // Check if key 2 has correct contents.
  await expect(page4.locator('body')).toContainText('revi@revi.xyz');
});
