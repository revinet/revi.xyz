/*
 * SPDX-FileCopyrightText: (C) 2026 Hong Yongmin (https://revi.xyz/) <yewon@revi.email>
 * SPDX-License-Identifier: Apache-2.0
 */

/** Resolve clocks by timezone identity, not UTC offset. */
export function getTimeSettings({
  homeTimezone = 'Asia/Seoul',
  travelTimezone = '',
} = {}) {
  return {
    homeTimezone,
    travelTimezone,
    isTravel: travelTimezone !== '' && travelTimezone !== 'Asia/Seoul',
  };
}

/** UTC offset at the given instant, including daylight saving time. */
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

/** Describe the visitor's time difference from home. */
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
