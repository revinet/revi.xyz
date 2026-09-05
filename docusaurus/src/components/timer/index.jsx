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
import {getTimeSettings, timezoneDifference} from './time';
import styles from './styles.module.css';

/** Display home, travel, and visitor timezone information. */
export default function Clock() {
  const {siteConfig} = useDocusaurusContext();
  const {homeTimezone, travelTimezone, isTravel} = getTimeSettings(
    siteConfig.customFields.time,
  );
  const [date, setDate] = useState(null);
  const [visitorTimezone, setVisitorTimezone] = useState('');

  useEffect(() => {
    setDate(new Date());
    setVisitorTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    const timerID = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timerID);
  }, []);

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
