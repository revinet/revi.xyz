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
