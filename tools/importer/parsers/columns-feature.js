/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-feature
 * Base block: columns
 * Source selector: .featured-group
 * Generated: 2026-06-05
 *
 * Structure: Two-column feature layout
 * - Left column: H2 heading, H3 subtitle, bullet list of benefits, CTA buttons
 * - Right column: Rate comparison boxes with icon, title, and rate descriptions
 * - Optional background image
 */
export default function parse(element, { document }) {
  // === LEFT COLUMN: Content ===
  const leftContent = [];

  // Heading (H2 - block description/label)
  const heading = element.querySelector('h2.featured-group__description, .featured-group__main > h2');
  if (heading) leftContent.push(heading);

  // Subtitle (H3 - main title)
  const subtitle = element.querySelector('h3.featured-group__tittle, .featured-group__main > h3');
  if (subtitle) leftContent.push(subtitle);

  // Bullet list of benefits
  const bulletList = element.querySelector('.featured-group__lead ul, .featured-group__main ul');
  if (bulletList) leftContent.push(bulletList);

  // CTA buttons
  const ctaContainer = element.querySelector('.featured-group__link');
  if (ctaContainer) {
    const buttons = ctaContainer.querySelectorAll('a');
    buttons.forEach((btn) => leftContent.push(btn));
  }

  // === RIGHT COLUMN: Rate comparison boxes ===
  const rightContent = [];

  // Get all featured boxes (rate comparison panels)
  const featuredBoxes = element.querySelectorAll('.featured-group__featured-box');
  featuredBoxes.forEach((box) => {
    // Box title (h4)
    const boxTitle = box.querySelector('h4.featured-group__featured-box-tittle, h4');
    if (boxTitle) rightContent.push(boxTitle);

    // Box description (rate details)
    const boxDesc = box.querySelector('.featured-group__featured-box-description');
    if (boxDesc) {
      const paragraphs = boxDesc.querySelectorAll('p');
      paragraphs.forEach((p) => rightContent.push(p));
    }

    // Add a separator between boxes (horizontal rule)
    const hr = document.createElement('hr');
    rightContent.push(hr);
  });

  // Remove trailing HR if present
  if (rightContent.length > 0 && rightContent[rightContent.length - 1].tagName === 'HR') {
    rightContent.pop();
  }

  // === BACKGROUND IMAGE (optional) ===
  const bgImage = element.querySelector('img.featured-group__img, .featured-group > img');

  // === BUILD CELLS ===
  // Row 1: Background image (if present)
  const cells = [];
  if (bgImage) {
    cells.push([bgImage]);
  }

  // Row 2: Two columns - left content | right content
  cells.push([leftContent, rightContent]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-feature', cells });
  element.replaceWith(block);
}
