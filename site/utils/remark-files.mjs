import { visit } from 'unist-util-visit';
import { SITE } from '../site.config';

/**
 * Remark plugin that transforms relative Markdown links
 * into site-friendly URLs
 *
 * This ensures that links work correctly in two contexts:
 * 
 * 1. Browsing source files on interfaces like GitHub
 * 2. Navigating the built Astro website
 * 
 * Handles three cases:
 *
 * 1. Absolute internal URLs: transforms 'https://example.com/path' to '/path'
 * 2. Files in the docs directory: transforms 'filename.md' to '/docs/filename/'
 * 3. README.md: transforms 'docs/filename.md' to '/docs/filename/'
 */
export function remarkFiles() {
  return (tree, file) => {
    //
    // The transformer runs only on the main README and for files in the docs directory.
    //
    const isReadme = file.path && (file.path?.endsWith('README.md') || file.path?.endsWith('readme.md'));
    const isDocsFile = file.path && file.path?.includes('/docs/');

    if (!isReadme && !isDocsFile) {
      return;
    }
    
    visit(tree, 'link', (node) => {
      const { url } = node;

      if (!url) {
        return;
      }

      //
      // Handle absolute URLs from our site
      //
      if (url.startsWith(SITE.siteURL)) {
        //
        // Transform 'https://omnicarousel.dev/path' to '/path'
        //
        node.url = url.replace(SITE.siteURL, '');
        //
        // Handle root URL: 'https://omnicarousel.dev' becomes '/'
        //
        if (url === '') {
          node.url = '/';
        }

        return;
      }

      //
      // Skip other external links
      //
      if (node.url.startsWith('http')) {
        return;
      }

      if (isDocsFile) {
        //
        // Transform 'filename.md' to '/docs/filename/'
        //
        if (node.url.endsWith('.md')) {
          const slug = node.url.replace('.md', '');

          node.url = `/docs/${slug}/`;
        }
      } else if (isReadme) {
        //
        // Transform 'docs/filename.md' to '/docs/filename/'
        //
        if (node.url.startsWith('docs/') && node.url.endsWith('.md')) {
          const slug = node.url.replace('docs/', '').replace('.md', '');

          node.url = `/docs/${slug}/`;
        }
      }
    });
  };
}
