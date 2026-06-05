/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-promo variant.
 * Base block: cards
 * Selector: .card-v2.card-v2--horizontal
 * Generated: 2026-06-05
 * Validated: selectors confirmed against source.html via JSDOM
 *
 * Extracts a single promotional card with:
 * - Card image (top)
 * - H2 descriptor/title
 * - H3 subtitle
 * - Description text
 * - CTA button link
 *
 * Source structure:
 *   div.card-v2.card-v2--horizontal
 *     img.card-v2__img
 *     div.card-v2__wrapper
 *       div.card-v2__content
 *         h2.card-v2__descriptor
 *         h3.card-v2__title
 *         div.card-v2__aditional-content > div (description)
 *       div.card-v2__footer
 *         a.btn (CTA)
 */
export default function parse(element, { document }) {
  // Extract image
  const image = element.querySelector(':scope > img.card-v2__img, :scope img.card-v2__img');

  // Extract heading (h2 descriptor)
  const heading = element.querySelector('h2.card-v2__descriptor, h2');

  // Extract subtitle (h3 title)
  const subtitle = element.querySelector('h3.card-v2__title, h3');

  // Extract description text from additional content
  const descriptionEl = element.querySelector('.card-v2__aditional-content > div, .card-v2__aditional-content');

  // Extract CTA link from footer
  const cta = element.querySelector('.card-v2__footer a, a.btn, a.btn--primary');

  // Build content cell: heading + subtitle + description + CTA
  const contentCell = [];
  if (image) {
    contentCell.push(image);
  }
  if (heading) {
    contentCell.push(heading);
  }
  if (subtitle) {
    contentCell.push(subtitle);
  }
  if (descriptionEl) {
    // Wrap description text in a paragraph if it's just a div
    const descText = descriptionEl.textContent.trim();
    if (descText) {
      const p = document.createElement('p');
      p.textContent = descText;
      contentCell.push(p);
    }
  }
  if (cta) {
    // Wrap CTA in strong for primary button treatment
    const p = document.createElement('p');
    const strong = document.createElement('strong');
    const link = document.createElement('a');
    link.href = cta.href;
    link.textContent = cta.textContent.trim();
    strong.append(link);
    p.append(strong);
    contentCell.push(p);
  }

  const cells = [contentCell];

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-promo', cells });
  element.replaceWith(block);
}
