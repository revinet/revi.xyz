/*
 * SPDX-FileCopyrightText: (C) 2026 Hong Yongmin (https://revi.xyz/) <yewon@revi.email>
 * SPDX-License-Identifier: Apache-2.0
 */

import {test, expect, type Page} from '@playwright/test';
import {getEnglishHolidayName} from '../docusaurus/src/components/timer/holidays';
import {
  getTimeSettings,
  timezoneDifference,
} from '../docusaurus/src/components/timer/time';

async function formatHomeDates(page: Page, dates: string[]) {
  return page.evaluate((values) => {
    const formatter = new Intl.DateTimeFormat(undefined, {
      dateStyle: 'full',
      timeStyle: 'long',
      hour12: false,
      timeZone: 'Asia/Seoul',
    });
    return values.map((value) => formatter.format(new Date(value)));
  }, dates);
}

test('Travel is determined by timezone name', () => {
  expect(getTimeSettings().isTravel).toBe(false);
  expect(getTimeSettings({travelTimezone: 'Asia/Seoul'}).isTravel).toBe(false);
  expect(getTimeSettings({travelTimezone: 'Asia/Tokyo'}).isTravel).toBe(true);
  expect(getTimeSettings({travelTimezone: 'Europe/London'}).isTravel).toBe(
    true,
  );
});

test('Travel dates include both full days in the home timezone', () => {
  // Both destinations have different calendar dates from Seoul at a boundary.
  for (const travelTimezone of ['America/Los_Angeles', 'Pacific/Auckland']) {
    const settings = {
      homeTimezone: 'Asia/Seoul',
      travelTimezone,
      travelStartDate: '2026-10-01',
      travelEndDate: '2026-10-03',
    };
    expect(
      getTimeSettings(settings, new Date('2026-09-30T14:59:59.999Z')).isTravel,
    ).toBe(false);
    expect(
      getTimeSettings(settings, new Date('2026-09-30T15:00:00Z')).isTravel,
    ).toBe(true);
    expect(
      getTimeSettings(settings, new Date('2026-10-03T14:59:59.999Z')).isTravel,
    ).toBe(true);
    expect(
      getTimeSettings(settings, new Date('2026-10-03T15:00:00Z')).isTravel,
    ).toBe(false);
  }
});

test('Either travel date can be omitted', () => {
  const before = new Date('2026-09-30T14:59:59.999Z');
  const during = new Date('2026-09-30T15:00:00Z');
  const after = new Date('2026-10-01T15:00:00Z');
  const startOnly = {
    travelTimezone: 'Europe/London',
    travelStartDate: '2026-10-01',
  };
  const endOnly = {
    travelTimezone: 'Europe/London',
    travelEndDate: '2026-10-01',
  };
  expect(getTimeSettings(startOnly, before).isTravel).toBe(false);
  expect(getTimeSettings(startOnly, during).isTravel).toBe(true);
  expect(getTimeSettings(startOnly, after).isTravel).toBe(true);
  expect(getTimeSettings(endOnly, before).isTravel).toBe(true);
  expect(getTimeSettings(endOnly, during).isTravel).toBe(true);
  expect(getTimeSettings(endOnly, after).isTravel).toBe(false);
  expect(
    getTimeSettings({travelTimezone: 'Europe/London'}, after).isTravel,
  ).toBe(true);
});

test('Travel dates are independent of the system timezone', () => {
  const originalTimezone = process.env.TZ;
  const settings = {
    travelTimezone: 'Europe/London',
    travelStartDate: '2026-10-01',
    travelEndDate: '2026-10-01',
  };
  try {
    for (const timezone of ['America/Los_Angeles', 'Pacific/Auckland', 'UTC']) {
      process.env.TZ = timezone;
      expect(
        getTimeSettings(settings, new Date('2026-09-30T14:59:59.999Z'))
          .isTravel,
      ).toBe(false);
      expect(
        getTimeSettings(settings, new Date('2026-09-30T15:00:00Z')).isTravel,
      ).toBe(true);
      expect(
        getTimeSettings(settings, new Date('2026-10-01T14:59:59.999Z'))
          .isTravel,
      ).toBe(true);
      expect(
        getTimeSettings(settings, new Date('2026-10-01T15:00:00Z')).isTravel,
      ).toBe(false);
    }
  } finally {
    if (originalTimezone === undefined) {
      delete process.env.TZ;
    } else {
      process.env.TZ = originalTimezone;
    }
  }
});

test('Invalid or reversed travel dates do not enable travel mode', () => {
  const date = new Date('2026-03-01T00:00:00Z');
  for (const value of ['not-a-date', '2026-02-29', '2026-13-01', '2026-3-1']) {
    expect(
      getTimeSettings(
        {travelTimezone: 'Asia/Tokyo', travelStartDate: value},
        date,
      ).isTravel,
    ).toBe(false);
    expect(
      getTimeSettings(
        {travelTimezone: 'Asia/Tokyo', travelEndDate: value},
        date,
      ).isTravel,
    ).toBe(false);
  }
  expect(
    getTimeSettings(
      {
        travelTimezone: 'Asia/Tokyo',
        travelStartDate: '2026-03-02',
        travelEndDate: '2026-02-28',
      },
      date,
    ).isTravel,
  ).toBe(false);
});

test('Scheduled travel waits for the live clock and needs a destination', () => {
  const settings = {travelStartDate: '2026-10-01', travelEndDate: '2026-10-01'};
  const date = new Date('2026-09-30T15:00:00Z');
  expect(getTimeSettings(settings, date).isTravel).toBe(false);
  expect(
    getTimeSettings({...settings, travelTimezone: 'Asia/Seoul'}, date).isTravel,
  ).toBe(false);
  expect(
    getTimeSettings({...settings, travelTimezone: 'Asia/Tokyo'}, null).isTravel,
  ).toBe(false);
  expect(
    getTimeSettings({...settings, travelTimezone: 'Asia/Tokyo'}, date).isTravel,
  ).toBe(true);
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
    await expect(home.getByRole('status')).toContainText(
      "1월 1일 (New Year's Day)",
    );
    await page.clock.runFor(1000);
    await expect(home).toContainText(expectedTimes[1]);
    await expect(
      page.getByRole('region', {name: 'Your timezone difference'}),
    ).toContainText('same local time');
    expect(errors).toEqual([]);
  });
});

test.describe('Korean holidays', () => {
  test.use({
    baseURL: 'http://127.0.0.1:9090',
    timezoneId: 'America/Los_Angeles',
    locale: 'en-US',
  });

  test('Every holiday in the installed presets has an English name', async () => {
    const presets = await import('@hyunbinseo/holidays-kr/all');
    const names = new Set(
      Object.values(presets).flatMap((year) => Object.values(year).flat()),
    );
    expect(
      [...names].filter((name) => getEnglishHolidayName(name) === null),
    ).toEqual([]);
  });

  test('Unknown holidays do not get an invented English name', () => {
    expect(getEnglishHolidayName('새 공휴일')).toBeNull();
    expect(getEnglishHolidayName('대체공휴일(새 공휴일)')).toBeNull();
  });

  for (const {date, names} of [
    {
      date: '2025-05-04T15:00:00Z',
      names: [
        {ko: '어린이날', en: "Children's Day"},
        {ko: '부처님 오신 날', en: "Buddha's Birthday"},
      ],
    },
    {
      date: '2025-05-05T15:00:00Z',
      names: [
        {
          ko: '대체공휴일(부처님 오신 날)',
          en: "Substitute holiday for Buddha's Birthday",
        },
      ],
    },
    {
      date: '2026-09-23T15:00:00Z',
      names: [{ko: '추석 전날', en: 'Day before Chuseok'}],
    },
    {
      date: '2026-12-24T15:00:00Z',
      names: [{ko: '기독탄신일', en: 'Christmas'}],
    },
  ]) {
    test(`Shows Korean and English holiday names for ${date}`, async ({
      page,
    }) => {
      await page.clock.setFixedTime(new Date(date));
      await page.goto('/time/');
      const status = page
        .getByRole('region', {name: 'Home clock'})
        .getByRole('status');
      const expectedNames = names.map(({ko, en}) => `${ko} (${en})`).join(', ');
      await expect(status).toHaveText(
        `Public holiday in South Korea: ${expectedNames}.`,
      );
      for (const {ko, en} of names) {
        await expect(status.getByText(ko, {exact: true})).toHaveAttribute(
          'lang',
          'ko',
        );
        await expect(status.getByText(en, {exact: true})).toHaveAttribute(
          'lang',
          'en',
        );
      }
    });
  }

  for (const timezoneId of ['America/Los_Angeles', 'Pacific/Auckland']) {
    test.describe(timezoneId, () => {
      test.use({timezoneId});

      test('Updates holidays at Korean midnight across New Year', async ({
        page,
      }) => {
        await page.clock.install({time: new Date('2025-12-31T14:58:00Z')});
        await page.clock.pauseAt(new Date('2025-12-31T14:59:59Z'));
        await page.goto('/time/');
        const [beforeMidnight, afterHoliday] = await formatHomeDates(page, [
          '2025-12-31T14:59:59Z',
          '2026-01-01T15:00:00Z',
        ]);
        const home = page.getByRole('region', {name: 'Home clock'});
        const holiday = home.getByRole('status');
        await expect(home).toContainText(beforeMidnight);
        await expect(holiday).toHaveCount(0);

        await page.clock.runFor(1000);
        await expect(holiday).toContainText('1월 1일');

        await page.clock.fastForward(24 * 60 * 60 * 1000);
        await expect(home).toContainText(afterHoliday);
        await expect(holiday).toHaveCount(0);
      });
    });
  }

  test('Keeps the clock running when the holiday year is unavailable', async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.clock.install({time: new Date('2026-01-01T00:00:00Z')});
    await page.clock.pauseAt(new Date('2026-01-01T00:01:00Z'));
    await page.goto('/time/');
    const [firstTick, secondTick] = await formatHomeDates(page, [
      '2099-01-01T00:00:01Z',
      '2099-01-01T00:00:02Z',
    ]);
    const home = page.getByRole('region', {name: 'Home clock'});
    await expect(home.getByRole('status')).toContainText('1월 1일');

    await page.clock.setSystemTime(new Date('2099-01-01T00:00:00Z'));
    await page.clock.runFor(1000);
    await expect(home).toContainText(firstTick);
    await expect(home.getByRole('status')).toHaveCount(0);
    await page.clock.runFor(1000);
    await expect(home).toContainText(secondTick);
    expect(errors).toEqual([]);
  });
});
