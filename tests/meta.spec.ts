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

test('Has title', async ({page}) => {
  await page.goto('/meta/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/About this site/);
  await page.getByRole('heading', {name: 'About this site'}).click();
});

test('Has expected page texts', async ({page}) => {
  await page.goto('/meta/');

  // Expect the text to be there.
  await expect(page.getByRole('article')).toContainText(
    'This website may contain trademarks or logos for third party projects, products, or services.',
  );
  // Expect Trademark warnning to be there.
  await expect(page.getByRole('article')).toContainText(
    'This website may contain trademarks or logos for third party projects, products, or services.',
  );
  // Expect there is "not freely available" image.
  await page
    .locator('div')
    .filter({hasText: /^Not freely available$/})
    .getByRole('img')
    .click();
});

test('Has expected links', async ({page}) => {
  await page.goto('/meta/');
  // Click on the link to the contribution docs.
  const page1Promise = page.waitForEvent('popup');
  await page
    .locator('p')
    .filter({hasText: "There's additional docs about"})
    .getByRole('link')
    .click();
  const page1 = await page1Promise;
  // Verify you landed to the right page.
  await page1.getByRole('heading', {name: 'Contributiion Docs'}).click();
});

test('Has expected ALT text', async ({page}) => {
  await page.goto('/meta/');

  // Expect the alt text to be there.
  await page
    .getByAltText('GitHub Actions Workflow Status (master branch)')
    .click();
  await page
    .getByAltText('GitHub Actions Workflow Status (prod branch)')
    .click();
});
