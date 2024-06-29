// SPDX-FileCopyrightText: 2024 Hong Yongmin <https://revi.xyz/>
//
// SPDX-License-Identifier: Apache-2.0
import {defineConfig, devices} from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
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
  See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://revi.xyz',

    // Set locale and timezone.
    locale: 'ko-KR',
    timezoneId: 'Asia/Seoul',

    /* Collect trace when retrying the failed test.
    See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  // Full list of devices:
  // https://issuetracker.revi.xyz/u/playwrightdevicelist
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
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
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
