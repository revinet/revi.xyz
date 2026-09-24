/*
 * SPDX-FileCopyrightText: (C) 2026 Hong Yongmin (https://revi.xyz/) <yewon@revi.email>
 * SPDX-License-Identifier: Apache-2.0
 */

// @ts-check

// Base English holiday names follow this article:
// https://en.wikipedia.org/wiki/Public_holidays_in_South_Korea
// Keys retain the names returned by @hyunbinseo/holidays-kr.
// Adjacent days and special holidays use descriptive English labels.
/** @type {ReadonlyMap<string, string>} */
const englishNames = new Map([
  ['1월 1일', "New Year's Day"],
  ['설날', 'Korean New Year'],
  ['설날 전날', 'Day before Korean New Year'],
  ['설날 다음 날', 'Day after Korean New Year'],
  ['3ㆍ1절', 'Independence Movement Day'],
  ['노동절', 'Labor Day'],
  ['어린이날', "Children's Day"],
  ['부처님 오신 날', "Buddha's Birthday"],
  ['현충일', 'Memorial Day'],
  ['제헌절', 'Constitution Day'],
  ['광복절', 'Liberation Day'],
  ['추석', 'Chuseok'],
  ['추석 전날', 'Day before Chuseok'],
  ['추석 다음 날', 'Day after Chuseok'],
  ['개천절', 'National Foundation Day'],
  ['한글날', 'Hangul Day'],
  ['기독탄신일', 'Christmas'],
  ['대통령선거', 'Election Day'],
  ['전국동시지방선거', 'Election Day'],
  ['임시공휴일', 'Temporary public holiday'],
]);

/**
 * Look up an English name, preserving unknown Korean names in the UI.
 * @param {string} name Korean holiday name from the package.
 * @returns {string | null}
 */
export function getEnglishHolidayName(name) {
  // The package includes the assembly number in legislative election names.
  if (/^제\d+대\s*국회의원선거$/.test(name)) {
    return 'Election Day';
  }
  const special = /^(대체공휴일|임시공휴일)\((.+)\)$/.exec(name);
  if (special) {
    const original = getEnglishHolidayName(special[2]);
    if (!original) {
      return null;
    }
    if (special[1] === '대체공휴일') {
      return `Substitute holiday for ${original}`;
    }
    return `Temporary public holiday (${original})`;
  }
  return englishNames.get(name) ?? null;
}
