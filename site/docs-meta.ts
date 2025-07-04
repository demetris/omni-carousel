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
    description: "",
  },
  "configuration-options": {
    title: "Options",
    description: "",
  },
  "css-essential-and-recommended": {
    title: "CSS",
    description: "",
  },
  "css-utilities": {
    title: "CSS utilities",
    description: "CSS classes and one CSS custom property provided by Omni Carousel for styling and effects",
  },
  "css-tips": {
    title: "CSS tips",
    description: "",
  },
  "html-markup": {
    title: "HTML markup",
    description: "",
  },
  "css-tips-know-your-width": {
    title: "Know your width",
    description: "",
  },
};

export function getDocMeta(docId: string): DocMeta | undefined {
  return docsMeta[docId];
}
