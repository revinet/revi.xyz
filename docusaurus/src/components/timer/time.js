/*
 * SPDX-FileCopyrightText: (C) 2026 Hong Yongmin (https://revi.xyz/) <yewon@revi.email>
 * SPDX-License-Identifier: Apache-2.0
 */

// @ts-check

/**
 * @typedef {object} TimeSettings
 * @property {string} [homeTimezone] Home IANA timezone; defaults to Asia/Seoul.
 * @property {string} [travelTimezone] Destination IANA timezone.
 * @property {string} [travelStartDate] Inclusive YYYY-MM-DD in homeTimezone.
 * @property {string} [travelEndDate] Inclusive YYYY-MM-DD in homeTimezone.
 */

/**
 * Check inclusive calendar dates in the home timezone.
 * @param {Date | null} date Current instant, or null before mounting.
 * @param {string} homeTimezone
 * @param {string} start
 * @param {string} end
 * @returns {boolean}
 */
function isWithinTravelDates(date, homeTimezone, start, end) {
  if (!start && !end) {
    return true;
  }
  // Wait for the live clock so SSR and the first client render agree.
  if (!date) {
    return false;
  }
  const validDates = [start, end].every((value) => {
    if (!value) {
      return true;
    }
    const parsed = new Date(value);
    return (
      /^\d{4}-\d{2}-\d{2}$/.test(value) &&
      !Number.isNaN(parsed.getTime()) &&
      parsed.toISOString().slice(0, 10) === value
    );
  });
  if (!validDates) {
    return false;
  }
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: homeTimezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const {year, month, day} = Object.fromEntries(
    parts.map(({type, value}) => [type, value]),
  );
  const homeDate = `${year}-${month}-${day}`;
  return (!start || homeDate >= start) && (!end || homeDate <= end);
}

/**
 * Resolve clocks by timezone identity and an optional travel date range.
 * @param {TimeSettings} [settings]
 * @param {Date | null} [date] Current instant, or null before mounting.
 * @returns {{homeTimezone: string, travelTimezone: string, isTravel: boolean}}
 */
export function getTimeSettings(
  {
    homeTimezone = 'Asia/Seoul',
    travelTimezone = '',
    travelStartDate = '',
    travelEndDate = '',
  } = {},
  date = new Date(),
) {
  return {
    homeTimezone,
    travelTimezone,
    isTravel:
      travelTimezone !== '' &&
      travelTimezone !== 'Asia/Seoul' &&
      isWithinTravelDates(date, homeTimezone, travelStartDate, travelEndDate),
  };
}

/**
 * UTC offset at the given instant, including daylight saving time.
 * @param {Date} date
 * @param {string} timeZone
 * @returns {number}
 */
function offsetMinutes(date, timeZone) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const values = Object.fromEntries(
    parts.map(({type, value}) => [type, value]),
  );
  return Math.round(
    (Date.UTC(
      Number(values.year),
      Number(values.month) - 1,
      Number(values.day),
      Number(values.hour),
      Number(values.minute),
      Number(values.second),
    ) -
      date.getTime()) /
      60000,
  );
}

/**
 * Describe the visitor's time difference from home.
 * @param {Date} date
 * @param {string} visitorTimezone
 * @param {string} homeTimezone
 * @returns {string}
 */
export function timezoneDifference(date, visitorTimezone, homeTimezone) {
  const difference =
    offsetMinutes(date, visitorTimezone) - offsetMinutes(date, homeTimezone);
  const home = homeTimezone === 'Asia/Seoul' ? 'Seoul' : homeTimezone;
  if (difference === 0) {
    return `Your timezone has the same local time as ${home} right now.`;
  }
  const hours = Math.floor(Math.abs(difference) / 60);
  const minutes = Math.abs(difference) % 60;
  const duration = [
    hours && `${hours} ${hours === 1 ? 'hour' : 'hours'}`,
    minutes && `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`,
  ]
    .filter(Boolean)
    .join(' ');
  return `Your timezone is ${duration} ${difference > 0 ? 'ahead of' : 'behind'} ${home}.`;
}
