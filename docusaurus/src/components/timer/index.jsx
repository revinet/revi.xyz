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

// When you update timezone here...
// update ../src/components/timer/index.js as well.

import React, {useState, useEffect} from 'react';
import Link from '@docusaurus/Link';

/** Define the current date&time for revi. */
function Clock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000); // Update every second

    return () => clearInterval(timerID); // Cleanup function for timer
  }, []); // Empty dependency array to run only once

  /** Tick the clock to update the clock timer every second. */
  function tick() {
    setDate(new Date());
  }

  const nowTime = Intl.DateTimeFormat([], {
    dateStyle: 'full',
    timeStyle: 'long',
    hour12: false,
    timeZone: 'Asia/Seoul',
  }).format(date);

  /* jshint ignore:start */
  return (
    <p suppressHydrationWarning={true}>
      It is {nowTime} in <code>Asia/Seoul</code> where <Link to="/">revi</Link>{' '}
      lives.
    </p>
  );
  /* jshint ignore:end */
}

export default Clock;
