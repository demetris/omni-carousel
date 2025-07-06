interface DocMeta {
  title?: string;
  description: string;
  order?: number;
  date?: string;
  dateModified?: string;
}

export const docsMeta: Record<string, DocMeta> = {
  "api": {
    title: "API",
    description: "The public API made available by createOmniCarousel(): lifecycle methods, navigation controls, and custom event handling",
  },
  "configuration-options": {
    title: "Options",
    description: "Configure Omni Carousel with scroll steps, image preloading, your own selectors and more",
  },
  "css-essential-and-recommended": {
    title: "CSS",
    description: "Essential and recommended CSS for setting the foundations of a carousel layout",
  },
  "css-utilities": {
    title: "CSS utilities",
    description: "CSS classes provided by Omni Carousel for styling and effects",
  },
  "css-tips": {
    title: "CSS tips",
    description: "Tips for carousels made with CSS: hide the scrollbar, add backward-compatible gaps and more",
  },
  "html-markup": {
    title: "HTML markup",
    description: "Example HTML markup for carousels with semantic elements, ARIA attributes, and navigation controls",
  },
  "css-tips-know-your-width": {
    title: "Know your width",
    description: "Techniques for controlling width and height of responsive slides in flex-based carousels",
  },
};

export function getDocMeta(docId: string): DocMeta | undefined {
  return docsMeta[docId];
}
