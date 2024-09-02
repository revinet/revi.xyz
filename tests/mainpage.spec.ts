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
