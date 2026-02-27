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
    description: "Complete API reference for Omni Carousel: initialization, navigation methods, event handling, and lifecycle management",
  },
  "configuration-options": {
    title: "Options",
    description: "Configure Omni Carousel with scroll steps, image preloading, your own selectors and more",
  },
  "css-essential-and-recommended": {
    title: "CSS",
    description: "Essential CSS for setting the foundations of a flex-based carousel layout",
  },
  "css-state-classes": {
    title: "CSS state classes",
    description: "CSS classes provided by Omni Carousel for conditional styling based on carousel state",
  },
  "css-tips": {
    title: "CSS tips",
    description: "CSS tips for carousels made with CSS: hide the scrollbar, add backward-compatible gaps and more",
  },
  "html-markup": {
    title: "HTML markup",
    description: "Example HTML markup for carousels with semantic elements, ARIA attributes, and navigation controls",
  },
  "css-tips-know-your-width": {
    title: "Know your width",
    description: "Techniques for controlling width and height of responsive slides in flex-based carousels",
  },
  "css-tips-peek-a-boo": {
    title: "CSS tips: Peek-a-boo effect",
    description: "How to create peek-a-boo effects (carousels with partially visible previous and next slides) using CSS pseudo-elements and custom properties",
  },
  "css-tips-responsive-slides": {
    title: "CSS tips: Responsive slides",
    description: "Techniques for creating slides that adapt to different screen sizes using per-view calculations and aspect ratios",
  },
};

export function getDocMeta(docId: string): DocMeta | undefined {
  return docsMeta[docId];
}
