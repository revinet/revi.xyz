// SPDX-FileCopyrightText: (C) 2024 Hong Yongmin <https://revi.xyz/>
// SPDX-FileContributor: Microsoft Corporation
//
// SPDX-License-Identifier: Apache-2.0

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
