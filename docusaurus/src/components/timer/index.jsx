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

// @ts-check
/**
 * @file Displays current date&time info for the place where revi currently is.
 * @copyright Hong Yongmin 2024
 * @license Apache-2.0
 */

import React, {useState, useEffect} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {getHolidayNames} from '@hyunbinseo/holidays-kr';
import {getEnglishHolidayName} from './holidays';
import {calendarDate, getTimeSettings, timezoneDifference} from './time';
import styles from './styles.module.css';

/**
 * @typedef {object} HolidayState
 * @property {string} date YYYY-MM-DD in Asia/Seoul for this result.
 * @property {Awaited<ReturnType<typeof getHolidayNames>>} names
 *   Holiday names, or null when there is no holiday or data is unavailable.
 */

/**
 * Display home, travel, and visitor timezone information.
 * @returns {import('react').ReactElement}
 */
export default function Clock() {
  const {siteConfig} = useDocusaurusContext();
  const [date, setDate] = useState(/** @type {Date | null} */ (null));
  const [visitorTimezone, setVisitorTimezone] = useState('');
  const [holiday, setHoliday] = useState(
    /** @type {HolidayState} */ ({
      date: '',
      names: null,
    }),
  );
  const koreanDate = date ? calendarDate(date, 'Asia/Seoul') : '';
  const timeSettings =
    /** @type {import('./time').TimeSettings | undefined} */ (
      siteConfig.customFields?.time
    );
  const {homeTimezone, travelTimezone, isTravel} = getTimeSettings(
    timeSettings,
    date,
  );

  useEffect(() => {
    setDate(new Date());
    setVisitorTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    const timerID = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timerID);
  }, []);

  useEffect(() => {
    if (!koreanDate) {
      return;
    }
    let active = true;
    getHolidayNames(koreanDate).then(
      (names) => {
        if (active) {
          setHoliday({date: koreanDate, names});
        }
      },
      () => {
        // Missing presets or failed loads should not interrupt the clock.
        if (active) {
          setHoliday({date: koreanDate, names: null});
        }
      },
    );
    return () => {
      active = false;
    };
  }, [koreanDate]);

  /**
   * @param {string} timeZone
   * @returns {string}
   */
  const formatTime = (timeZone) =>
    date
      ? new Intl.DateTimeFormat(undefined, {
          dateStyle: 'full',
          timeStyle: 'long',
          hour12: false,
          timeZone,
        }).format(date)
      : '—';

  return (
    <section className={styles.card} aria-label="Current time for revi">
      <div className={styles.topline}>
        <span>Current time</span>
        <span className={styles.badge}>
          {isTravel ? 'Travel mode' : 'Home timezone'}
        </span>
      </div>
      <section className={styles.row} aria-label="Home clock">
        <div className={styles.label}>
          Home · <code>{homeTimezone}</code>
        </div>
        <p>
          It is <strong>{formatTime(homeTimezone)}</strong> in{' '}
          <code>{homeTimezone}</code> where revi lives.
        </p>
        {holiday.date === koreanDate && holiday.names && (
          <p role="status">
            Public holiday in South Korea:{' '}
            {holiday.names.map((name, index) => {
              const englishName = getEnglishHolidayName(name);
              return (
                <React.Fragment key={name}>
                  {index > 0 && ', '}
                  <strong>
                    <span lang="ko">{name}</span>
                    {englishName && (
                      <>
                        {' '}
                        (<span lang="en">{englishName}</span>)
                      </>
                    )}
                  </strong>
                </React.Fragment>
              );
            })}
            .
          </p>
        )}
      </section>
      {isTravel && (
        <section className={styles.row} aria-label="Travel clock">
          <div className={styles.label}>
            On the go · <code>{travelTimezone}</code>
          </div>
          <p>
            revi is on the go. It is{' '}
            <strong>{formatTime(travelTimezone)}</strong> in{' '}
            <code>{travelTimezone}</code>.
          </p>
        </section>
      )}
      {date && visitorTimezone && visitorTimezone !== homeTimezone && (
        <section
          className={styles.difference}
          aria-label="Your timezone difference">
          <div className={styles.label}>Your timezone · {visitorTimezone}</div>
          <p>{timezoneDifference(date, visitorTimezone, homeTimezone)}</p>
        </section>
      )}
    </section>
  );
}
