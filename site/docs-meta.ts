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
  "config": {
    title: "Options",
    description: "",
  },
  "css": {
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
  "html": {
    title: "Options",
    description: "",
  },
  "css-tips-track-width": {
    title: "Know your track width",
    description: "",
  },
};

export function getDocMeta(docId: string): DocMeta | undefined {
  return docsMeta[docId];
}
