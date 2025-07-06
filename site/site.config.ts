export interface Site {
  name: string;
  description: string;
  siteURL: string;
  githubURL?: string;
  npmURL?: string;

  authorName: string;
  since: number;

  documentationPagePrefix: string;
  demoPagePrefix: string;
  searchPlaceholder: string;
}

export const SITE: Site = {
  name: 'Omni Carousel',
  description: 'A JavaScript library that enhances CSS-only carousels with keyboard navigation, indicators, and scroll controls',
  siteURL: 'https://omnicarousel.dev',
  githubURL: 'https://github.com/demetris/omni-carousel',
  npmURL: 'https://www.npmjs.com/package/omni-carousel',

  authorName: 'Demetris Kikizas',
  since: 2025,

  documentationPagePrefix: 'Docs',
  demoPagePrefix: 'Demos',
  searchPlaceholder: 'Search Omni docs and demos…'
};
