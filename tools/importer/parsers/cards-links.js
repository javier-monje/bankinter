/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-links variant.
 * Base block: cards
 * Source selector: .content-box.content-box--border
 * Each instance is a single icon-link navigation card with:
 *   - A colored circular icon
 *   - A text label
 *   - An arrow indicator
 *   - The entire card is a clickable link
 * Generated: 2026-06-05
 */
export default function parse(element, { document }) {
  // Extract the main link element
  const link = element.querySelector('a.content-box-simple__link, a[href]');

  // Extract the text label
  const labelSpan = element.querySelector('.content-box-simple__texto, span[class*="texto"]');
  const labelText = labelSpan ? labelSpan.textContent.trim() : '';

  // Extract the href
  const href = link ? link.getAttribute('href') : '';

  // Build the content cell with a proper link element
  const contentCell = [];

  if (link && labelText) {
    // Create a link element preserving the href and text
    const linkEl = document.createElement('a');
    linkEl.setAttribute('href', href);
    linkEl.textContent = labelText;
    contentCell.push(linkEl);
  }

  // Build cells array - single row with the linked text
  const cells = [contentCell];

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-links', cells });
  element.replaceWith(block);
}
