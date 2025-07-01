import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsMeta as docsMetadata } from './docs-meta.ts';

const docs = defineCollection({
  /**
   * Match all markdown files that do not start with an underscore
   * so that we can use the uncerscore convention for draft/private files
   */
  loader: glob({
    pattern: "**/[^_]*.md",
    base: "./docs"
  }),
  schema: z.object({
  }),
});

/**
 * Collection of metadata for the docs collection from a single TypeScript file
 *
 * Why a separate collection for the data?
 *
 * It allows us to keep the docs Markdown files clean,
 * without the frontmatter that is required for Astro pages.
 */
const docsMeta = defineCollection({
  loader: () => {
    //
    // Use statically imported metadata to avoid module runner issues during build
    //
    return Object.entries(docsMetadata).map(([id, data]) => ({
      id,
      data
    }));
  },
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    order: z.number().optional(),
    date: z.string().optional().transform(str => str ? new Date(str) : new Date()),
    dateModified: z.string().optional().transform(str => str ? new Date(str) : undefined),
  }),
});

export const collections = {
  docs,
  docsMeta
};
