/**
 * @file Inject schema.org JSON-LD for ProfilePage into the profile page.
 * @copyright Hong Yongmin 2024
 * @license Apache-2.0
 */

function schema() {
  JSON.stringify({
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
  });

  return <script type="application/ld+json">{schema}</script>;
}

export default schema;
