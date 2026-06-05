/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-promo
 * Base block: hero
 * Selectors: .elem6 .banner-hero, .elem3 .banner-hero
 * Description: Promotional banner with background image, heading, subtitle, bullet list, and CTA button.
 * Generated: 2026-06-05
 */
export default function parse(element, { document }) {
  // Extract background image
  const bgImage = element.querySelector(':scope > img.banner-hero__img, :scope img[class*="banner-hero__img"]');

  // Extract heading (h2.banner-hero__description)
  const heading = element.querySelector('h2.banner-hero__description, h2[class*="description"]');

  // Extract subtitle (h3.banner-hero__tittle - note: typo in source class)
  const subtitle = element.querySelector('h3.banner-hero__tittle, h3[class*="tittle"], h3[class*="title"]');

  // Extract lead content (paragraph text + bullet list)
  const leadContainer = element.querySelector('.banner-hero__lead');
  const leadParagraphs = leadContainer
    ? Array.from(leadContainer.querySelectorAll(':scope > p'))
    : [];
  const bulletList = element.querySelector('ul.list_bullets, .banner-hero__lead ul');

  // Extract CTA button
  const ctaLink = element.querySelector('.banner-hero__link a, a.btn--primary, a.btn');

  // Build cells array - hero block structure:
  // Row 1: Background image
  // Row 2: Content (heading, subtitle, text, bullets, CTA)
  const cells = [];

  // Row 1: Background image (if present)
  if (bgImage) {
    cells.push([bgImage]);
  }

  // Row 2: Content cell with all text and CTA
  const contentCell = [];

  if (heading) {
    contentCell.push(heading);
  }

  if (subtitle) {
    contentCell.push(subtitle);
  }

  // Add lead paragraphs (intro text)
  leadParagraphs.forEach((p) => {
    contentCell.push(p);
  });

  // Add bullet list
  if (bulletList) {
    contentCell.push(bulletList);
  }

  // Add CTA button
  if (ctaLink) {
    contentCell.push(ctaLink);
  }

  if (contentCell.length > 0) {
    cells.push(contentCell);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-promo', cells });
  element.replaceWith(block);
}
