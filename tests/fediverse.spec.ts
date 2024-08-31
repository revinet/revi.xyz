// SPDX-FileCopyrightText: (C) 2024 Hong Yongmin <https://revi.xyz/>
// SPDX-FileContributor: Microsoft Corporation
//
// SPDX-License-Identifier: Apache-2.0

import {test, expect} from '@playwright/test';

// TODO: Make it work on Chromium-based browsers.
// test('Desktop-Only: Click the navbar link to fediverse page', async ({
//   page,
//   isMobile,
// }) => {
//   test.skip(isMobile, 'Skipping desktop-only tests...');
//   await page.goto('/');
//   // Open the navbar.
//   await page.getByRole('button', {name: 'other sites'}).click();
//   // Check the link to the fediverse page is visible when navbar is open.
//   await expect(
//     page.getByRole('link', {name: 'fediverse accounts', exact: true}),
//   ).toBeVisible();
//   // Click the link to the fediverse page.
//   await page
//     .getByRole('link', {name: 'fediverse accounts', exact: true})
//     .click();
//   // Expect the page title to be there.
//   await expect(
//     page.getByRole('heading', {name: 'revi at fediverse'}),
//   ).toBeVisible();
//   await expect(page.getByRole('heading')).toContainText('revi at fediverse');
// });

test('Check existance of fediverse page', async ({page}) => {
  await page.goto('/fediverse/');

  // Expect the page title to be there.
  await expect(
    page.getByRole('heading', {name: 'revi at fediverse'}),
  ).toBeVisible();
  // Expect the page to have the note for English speakers.
  await expect(page.getByText('Note for English speakerIf')).toBeVisible();
});

test('Check contents of fediverse page', async ({page}) => {
  await page.goto('/fediverse/');
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
