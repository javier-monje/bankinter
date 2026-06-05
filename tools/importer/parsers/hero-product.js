/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-product
 * Base block: hero
 * Source selectors: .elem1 .banner-hero, .elem4 .banner-hero
 * Generated: 2026-06-05
 *
 * Extracts a full-bleed promotional hero banner with:
 * - Background image
 * - H1 description + H2 product name
 * - Bullet list of benefits
 * - Rate highlight box (AER/NIR values)
 * - Two CTA buttons (primary + secondary)
 * - Optional risk indicator
 */
export default function parse(element, { document }) {
  // --- Extract background image ---
  const bgImage = element.querySelector('img.banner-hero__img, img[class*="banner-hero__img"]');

  // --- Extract headings ---
  const description = element.querySelector('h1.banner-hero__description, .banner-hero__description');
  const title = element.querySelector('h2.banner-hero__tittle, .banner-hero__tittle');

  // --- Extract benefits list ---
  const benefitsList = element.querySelector('.banner-hero__lead ul, .list_bullets');
  const availabilityText = element.querySelector('.banner-hero__lead > p');

  // --- Extract rate highlight box ---
  const rateBox = element.querySelector('.banner-hero__square, .banner-hero__extra-content');

  // --- Extract CTA buttons ---
  const ctaLinks = Array.from(element.querySelectorAll('.banner-hero__link a, .banner-hero__link .btn'));

  // --- Extract risk indicator (optional) ---
  const riskIndicator = element.querySelector('.banner-hero__risk-indicator');

  // --- Build cells array ---
  const cells = [];

  // Row 1: Background image
  if (bgImage) {
    cells.push([bgImage]);
  }

  // Row 2: Main content (headings + benefits + rate box + CTAs)
  const contentCell = [];

  if (description) {
    contentCell.push(description);
  }

  if (title) {
    contentCell.push(title);
  }

  if (benefitsList) {
    contentCell.push(benefitsList);
  }

  if (availabilityText) {
    contentCell.push(availabilityText);
  }

  if (rateBox) {
    contentCell.push(rateBox);
  }

  if (ctaLinks.length > 0) {
    contentCell.push(...ctaLinks);
  }

  if (contentCell.length > 0) {
    cells.push(contentCell);
  }

  // Row 3: Risk indicator (optional)
  if (riskIndicator) {
    cells.push([riskIndicator]);
  }

  // --- Create block and replace element ---
  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-product', cells });
  element.replaceWith(block);
}
