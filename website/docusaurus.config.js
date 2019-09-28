module.exports = {
  title: 'React Tracked',
  tagline: 'Super fast React global/shared state with context and hooks',
  organizationName: 'dai-shi',
  projectName: 'react-tracked',
  url: 'https://dai-shi.github.io',
  baseUrl: '/react-tracked/',
  favicon: 'img/favicon.ico',
  themes: ['@docusaurus/theme-live-codeblock'],
  plugins: [],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
        },
      },
    ],
  ],
  themeConfig: {
    navbar: {
      title: 'React Tracked',
      links: [
        { to: 'docs/introduction', label: 'Getting Started', position: 'left' },
        { to: 'docs/api', label: 'Reference', position: 'left' },
        {
          href: 'https://github.com/dai-shi/react-tracked',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/introduction',
            },
            {
              label: 'Reference',
              to: 'docs/api',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/dai-shi/react-tracked',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/dai_shi',
            },
          ],
        },
      ],
      copyright: 'Copyright © 2019 Daishi Kato',
    },
  },
};
