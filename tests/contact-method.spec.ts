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

test('Check headings', async ({page}) => {
  // Connect to main page.
  await page.goto('/');

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

test('Check omglol.email is there', async ({page}) => {
  // Connect to the contact method pages.
  await page.goto('/contact-method/');

  // Expects page to have Email TabBox visible.
  await expect(page.getByText('tipgeneralwikiFor a longer-')).toBeVisible();
  // Expects page to have Tab with the name of "general".
  await expect(page.getByText('generalwiki')).toBeVisible();
  await page.getByRole('tab', {name: 'general'}).click();
  // Expects page to have a TabPanel visible.
  await expect(page.getByRole('tabpanel')).toBeVisible();
  // Expects page to have a text with the content of "liame.lolgmo@iver"
  await expect(page.getByRole('tabpanel')).toContainText(/liame\.lolgmo\@iver/);
});

test('Check revi.wiki email is there', async ({page}) => {
  // Connect to the contact method pages.
  await page.goto('/contact-method/');

  await page.getByRole('tab', {name: 'wiki'}).click();
  // Expects page to have Tab with the name of "general".
  await expect(page.getByText('generalwiki')).toBeVisible();
  // Click the wiki tab.
  await page.getByRole('tab', {name: 'wiki'}).click();
  // Expects page to have a TabPanel visible.
  await expect(page.getByRole('tabpanel')).toBeVisible();
  // Expects page to have a wiki-specific instruction text.
  await expect(page.getByText('If your topic is about wiki')).toBeVisible();
  // Expects page to have a text with the content of "ikiw.iver@iver"
  await expect(page.getByText('package mainimport "fmt"func')).toBeVisible();
  await expect(page.locator('pre')).toContainText('"ikiw.iver@iver"');
});
