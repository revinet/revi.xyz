// SPDX-FileCopyrightText: 2024 Hong Yongmin <https://revi.xyz/>
//
// SPDX-License-Identifier: Apache-2.0
// @ts-check
/**
 * @file Inject Header into the profile page.
 * @copyright Hong Yongmin 2024
 * @license Apache-2.0
 */

import * as React from 'react';

/** Generate Schema.org header */
function Header(): React.ReactNode {
  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: 'revi',
      alternateName: 'Yongmin Hong',
      description: 'Chief Laziness Officer appointed by myself.',
      image: 'https://revi.xyz/img/logo.png',
      sameAs: [
        'https://github.com/revi',
        'https://meta.wikimedia.org/wiki/User:-revi',
        'https://stackoverflow.com/users/5089628/revi',
        'https://www.last.fm/user/revinim',
      ],
    },
  };

  return (
    <head>
      <link rel="authorization_endpoint" href="https://indieauth.com/auth" />
      <link rel="token_endpoint" href="https://tokens.indieauth.com/token" />
      <link rel="me authn" href="https://github.com/revi" />
      <link rel="me" href="https://www.last.fm/user/revinim" />
      <link rel="me" href="https://stackoverflow.com/users/5089628/revi" />
      <link rel="me" href="https://meta.wikimedia.org/wiki/User:-revi" />
      <script>{JSON.stringify(schemaJson)}</script>
    </head>
  );
}

export default Header;
