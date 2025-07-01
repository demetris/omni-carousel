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
  description: 'A lightweight carousel component to enhance scrollable areas',
  siteURL: 'https://omnicarousel.dev',
  githubURL: 'https://github.com/demetris/omni-carousel',
  npmURL: 'https://github.com/demetris/omni-carousel',

  authorName: 'Demetris Kikizas',
  since: 2025,

  documentationPagePrefix: 'Docs',
  demoPagePrefix: 'Demos',
  searchPlaceholder: 'Search Omni docs and demos…'
};
