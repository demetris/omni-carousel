import { visit } from 'unist-util-visit';

/**
 * Rehype plugin that wraps all tables in a div with class "table-wrapper"
 *
 * This enables horizontal scrolling for wide tables on mobile devices
 */
export function rehypeTables() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName === 'table' && parent && typeof index === 'number') {
        //
        // Create wrapper div
        //
        const wrapper = {
          type: 'element',
          tagName: 'div',
          properties: { className: ['table-wrapper'] },
          children: [node]
        };

        //
        // Replace the table with the wrapper
        //
        parent.children[index] = wrapper;
      }
    });
  };
}
