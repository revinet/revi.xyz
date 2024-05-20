import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';

function Clock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000); // Update every second

    return () => clearInterval(timerID); // Cleanup function for timer
  }, []); // Empty dependency array to run only once

  function tick() {
    setDate(new Date());
  }

  const nowTime = Intl.DateTimeFormat([], {
    dateStyle: 'full',
    timeStyle: 'long',
    hour12: false,
    timeZone: 'Asia/Seoul',
  }).format(date);

  return (
    <p>
      It is {nowTime} in <code>Asia/Seoul</code> where{' '}
      <Link to="/">revi</Link> lives.
    </p>
  );
}

export default Clock;
