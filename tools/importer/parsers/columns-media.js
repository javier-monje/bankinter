/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-media
 * Base block: columns
 * Source selector: .video.video_orange
 * Generated: 2026-06-05
 *
 * Structure: Two-column media layout
 * - Left column: Embedded YouTube video (iframe)
 * - Right column: H2 eyebrow (small uppercase), H3 title, description paragraph, CTA button
 */
export default function parse(element, { document }) {
  // === LEFT COLUMN: Video/Media ===
  const leftContent = [];

  // YouTube iframe - extract from video container
  const iframe = element.querySelector('.video__container iframe, .video__container__player iframe, iframe[src*="youtube"]');
  if (iframe) {
    // Preserve the iframe as a link to the YouTube video for EDS import
    const videoUrl = iframe.getAttribute('src') || '';
    const a = document.createElement('a');
    a.href = videoUrl;
    a.textContent = videoUrl;
    leftContent.push(a);
  }

  // === RIGHT COLUMN: Content ===
  const rightContent = [];

  // Eyebrow heading (H2 with small uppercase styling)
  const eyebrow = element.querySelector('.video__right-side h2, h2.h6, h2.text-uppercase');
  if (eyebrow) {
    const h2 = document.createElement('h2');
    h2.textContent = eyebrow.textContent.trim();
    rightContent.push(h2);
  }

  // Main title (H3)
  const title = element.querySelector('.video__right-side h3, h3.video__title, .video__title');
  if (title) {
    const h3 = document.createElement('h3');
    h3.textContent = title.textContent.trim();
    rightContent.push(h3);
  }

  // Description paragraph
  const description = element.querySelector('.video__right-side > p, .video__right-side p.mb-40');
  if (description) {
    const p = document.createElement('p');
    p.textContent = description.textContent.trim();
    rightContent.push(p);
  }

  // CTA button link
  const ctaLink = element.querySelector('.video__right-side a.btn, .video__right-side a[class*="btn"], a.btn--primary');
  if (ctaLink) {
    const p = document.createElement('p');
    const a = document.createElement('a');
    a.href = ctaLink.getAttribute('href') || '';
    a.textContent = ctaLink.textContent.trim();
    p.appendChild(a);
    rightContent.push(p);
  }

  // === BUILD CELLS ===
  // Single row with two columns: video | content
  const cells = [];
  cells.push([leftContent, rightContent]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-media', cells });
  element.replaceWith(block);
}
