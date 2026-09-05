/*
 * SPDX-FileCopyrightText: (C) 2026 Hong Yongmin (https://revi.xyz/) <yewon@revi.email>
 * SPDX-License-Identifier: Apache-2.0
 */

import {test, expect} from '@playwright/test';
import {
  getTimeSettings,
  timezoneDifference,
} from '../docusaurus/src/components/timer/time';

test('Travel is determined by timezone name', () => {
  expect(getTimeSettings().isTravel).toBe(false);
  expect(getTimeSettings({travelTimezone: 'Asia/Seoul'}).isTravel).toBe(false);
  expect(getTimeSettings({travelTimezone: 'Asia/Tokyo'}).isTravel).toBe(true);
  expect(getTimeSettings({travelTimezone: 'Europe/London'}).isTravel).toBe(
    true,
  );
});

test('Differences handle equal offsets, fractional hours, DST, and dates', () => {
  const winter = new Date('2026-01-01T15:00:00.500Z');
  const summer = new Date('2026-07-01T15:00:00Z');
  expect(timezoneDifference(winter, 'Asia/Tokyo', 'Asia/Seoul')).toContain(
    'same local time',
  );
  expect(timezoneDifference(winter, 'Asia/Kathmandu', 'Asia/Seoul')).toContain(
    '3 hours 15 minutes behind',
  );
  expect(
    timezoneDifference(winter, 'America/New_York', 'Asia/Seoul'),
  ).toContain('14 hours behind');
  expect(
    timezoneDifference(summer, 'America/New_York', 'Asia/Seoul'),
  ).toContain('13 hours behind');
  expect(
    timezoneDifference(winter, 'Pacific/Auckland', 'Asia/Seoul'),
  ).toContain('4 hours ahead');
});

test.describe('Time page', () => {
  test.use({
    baseURL: 'http://127.0.0.1:9090',
    timezoneId: 'Asia/Tokyo',
    locale: 'en-US',
  });

  test('Shows live home time and visitor difference without hydration errors', async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.clock.install({time: new Date('2025-12-31T23:59:00Z')});
    await page.clock.pauseAt(new Date('2026-01-01T00:00:00Z'));
    await page.goto('/time/');
    const expectedTimes = await page.evaluate(() => {
      const formatter = new Intl.DateTimeFormat(undefined, {
        timeStyle: 'long',
        hour12: false,
        timeZone: 'Asia/Seoul',
      });
      return [0, 1].map((second) =>
        formatter.format(new Date(Date.UTC(2026, 0, 1, 0, 0, second))),
      );
    });
    const home = page.getByRole('region', {name: 'Home clock'});
    await expect(home).toContainText('Asia/Seoul');
    await expect(home).toContainText(expectedTimes[0]);
    await page.clock.runFor(1000);
    await expect(home).toContainText(expectedTimes[1]);
    await expect(
      page.getByRole('region', {name: 'Your timezone difference'}),
    ).toContainText('same local time');
    expect(errors).toEqual([]);
  });
});
