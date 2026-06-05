/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Bankinter sections
 * Inserts section breaks (<hr>) and Section Metadata blocks based on template sections.
 * Selectors validated against migration-work/cleaned.html:
 *   section:has(.elem1), section:has(.elem5), section:has(.elem22),
 *   section:has(.elem10), section:has(.card-v2), section:has(.elem3),
 *   section:has(.call-me), section:has(.content-box--border)
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const { template } = payload;
    if (!template || !template.sections || template.sections.length < 2) return;

    const { sections } = template;
    const document = element.ownerDocument;

    // Process sections in reverse order to preserve DOM positions
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i];
      const sectionEl = element.querySelector(section.selector);
      if (!sectionEl) continue;

      // Insert Section Metadata block if section has a style
      if (section.style) {
        const metadataBlock = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.append(metadataBlock);
      }

      // Insert <hr> before each non-first section to mark section breaks
      if (i > 0) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    }
  }
}
