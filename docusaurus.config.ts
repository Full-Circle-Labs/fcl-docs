import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'FCL Docs',
  tagline: 'Full Circle Labs Documentation',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://docs.fullcirclelabs.bio',
  baseUrl: '/',

  organizationName: 'fullcirclelabs',
  projectName: 'fcl-docs',

  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          docItemComponent: '@theme/ApiItem',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: 'api',
        docsPluginId: 'classic',
        config: {
          fclV1: {
            specPath: 'static/openapi/fcl-api-v1.yaml',
            outputDir: 'docs/reference',
            sidebarOptions: {
              groupPathsBy: 'tag',
            },
          },
        },
      },
    ],
  ],

  themes: ['docusaurus-theme-openapi-docs'],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: '',
      logo: {
        alt: 'Full Circle Labs Logo',
        src: 'img/logo.png',
        href: 'https://fullcirclelabs.bio/',
      },
      items: [
        {
          to: '/docs/home/intro',
          position: 'left',
          label: 'Home',
          className: 'nav-home',
        },
        {
          type: 'docSidebar',
          sidebarId: 'guidesSidebar',
          position: 'left',
          label: 'Guides',
          className: 'nav-documentation',
        },
        {
          type: 'docSidebar',
          sidebarId: 'apiSidebar',
          position: 'left',
          label: 'API',
          className: 'nav-api',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'FCL Docs',
          items: [
            {label: 'Home', to: '/docs/home/intro'},
            {label: 'Guides', to: '/docs/documentation/intro'},
            {label: 'API', to: '/docs/api/quickstart'},
            {label: 'Contribute', to: '/docs/home/contribute'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Full Circle Labs.`,
    },
    api: {
      authPersistance: 'localStorage',
    },
    languageTabs: [
      { highlight: 'bash', language: 'curl', logoClass: 'curl' },
      { highlight: 'python', language: 'python', logoClass: 'python' },
      { highlight: 'r', language: 'r', logoClass: 'r' },
    ],
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
