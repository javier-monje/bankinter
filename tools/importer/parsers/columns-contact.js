/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-contact.
 * Base block: columns
 * Source selector: .call-me
 * Generated: 2026-06-05
 *
 * 3-column contact bar:
 *   Column 1: H2 heading "Bankinter listens" + description text
 *   Column 2: CTA button "Contact us"
 *   Column 3: Phone number info + "ATMs and branches" link
 */
export default function parse(element, { document }) {
  // Column 1: heading + description
  const heading = element.querySelector('.call-me__title, h2');
  const description = element.querySelector('.call-me__title + span, .col-12:first-child span:not(.call-me__title)');

  const col1 = [];
  if (heading) col1.push(heading);
  if (description) {
    const p = document.createElement('p');
    p.textContent = description.textContent;
    col1.push(p);
  }

  // Column 2: CTA button
  const ctaLink = element.querySelector('.btn, a.btn--primary, a[href*="customer-service"]');
  const col2 = [];
  if (ctaLink) {
    const a = document.createElement('a');
    a.href = ctaLink.href || ctaLink.getAttribute('href');
    a.textContent = ctaLink.textContent.trim();
    col2.push(a);
  }

  // Column 3: contact info + link
  const contactInfo = element.querySelector('.call-me__contact-info');
  const branchLink = element.querySelector('a.text-link, a[href*="office-atm"], a[href*="branch"]');

  const col3 = [];
  if (contactInfo) {
    const p = document.createElement('p');
    p.textContent = contactInfo.textContent.trim();
    col3.push(p);
  }
  if (branchLink) {
    const a = document.createElement('a');
    a.href = branchLink.href || branchLink.getAttribute('href');
    a.textContent = branchLink.textContent.trim();
    col3.push(a);
  }

  // Build cells: single row with 3 columns
  const cells = [
    [col1, col2, col3],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-contact', cells });
  element.replaceWith(block);
}
