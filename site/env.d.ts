declare module '@pagefind/default-ui' {
  interface PagefindUIOptions {
    element: string;
    autofocus?: boolean;
    pageSize?: number;
    excerptLength?: number;
    resetStyles?: boolean;
    showSubResults?: boolean;
    showImages?: boolean;
    translations?: {
      placeholder?: string;
      zero_results?: string;
      [key: string]: string | undefined;
    };
  }

  export class PagefindUI {
    constructor(options: PagefindUIOptions);
  }
}
