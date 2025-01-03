/*
 * SPDX-FileCopyrightText: (C) 2024 Hong Yongmin (https://revi.xyz/) <yewon@revi.email>
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

import {defineConfig, devices} from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://revi.kr/1Pywz4H.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally
  left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI twice, otherwise once */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : '50%',
  /* Expect timeout in 10 seconds */
  expect: {timeout: 10000},
  /* Shared settings for all the projects below.
  See https://revi.kr/mN4idyc. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://revi.xyz',

    // Set locale and timezone.
    locale: 'ko-KR',
    timezoneId: 'Asia/Seoul',

    /* Collect trace when retrying the failed test.
    See https://revi.kr/KO9i4Ki */
    trace: 'on-first-retry',
  },

  // Full list of devices:
  // https://revi.kr/playwrightdevicelist
  /* Test against major browsers */
  projects: [
    {
      name: 'Chromium',
      use: {
        ...devices['Desktop Chrome'],
        isMobile: false,
      },
    },
    {
      name: 'Firefox',
      use: {
        ...devices['Desktop Firefox'],
        isMobile: false,
      },
    },
    {
      name: 'Webkit',
      use: {
        ...devices['Desktop Safari'],
        isMobile: false,
      },
    },
    /* Test against mobile viewports. */
    {
      name: 'Android Chrome',
      use: {
        ...devices['Pixel 7'],
        isMobile: true,
      },
    },
    {
      name: 'iOS Safari',
      use: {
        ...devices['iPhone 11 Pro'],
        isMobile: true,
      },
    },
    {
      name: 'iPadOS Safari',
      use: {
        ...devices['iPad Pro 11'],
        isMobile: true,
      },
    },
    /* Test against branded browsers. */
    {
      name: 'Microsoft Edge',
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge',
        isMobile: false,
      },
    },
    {
      name: 'Google Chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        isMobile: false,
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  /* Remember that you should've run `npm run dbuild` to build the site */
  webServer: {
    command: 'npx wrangler pages dev docusaurus/build --port 9090',
    url: 'http://127.0.0.1:9090',
    reuseExistingServer: !process.env.CI,
    timeout: 180 * 1000, // 3 minutes
  },

  /* Stores the test artifacts in playwright-report directory */
  outputDir: 'test-results/',

  /* Produce report in `line`, `json`, `buildkite`, `github` format */
  /* Reporter to use. See https://revi.kr/1i03r9Y */
  reporter: [
    ['json', {outputFile: 'test-results/results.json'}],
    [process.env.CI ? 'github' : 'list'],
    [
      // (? in a new line generates jshint warning)
      // prettier-ignore
      process.env.BUILDKITE_ANALYTICS_TOKEN ?
        'buildkite-test-collector/playwright/reporter'
        : 'html',
      {open: 'never'},
    ],
  ],
});
