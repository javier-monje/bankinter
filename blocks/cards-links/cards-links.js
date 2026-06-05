export default function decorate(block) {
  // Each cards-links block is a single link card.
  // Structure: one row, one cell, containing a <p><a>text</a></p>
  const link = block.querySelector('a');
  if (!link) return;

  // Wrap link text in a span for flex layout targeting
  const textSpan = document.createElement('span');
  textSpan.className = 'cards-links-text';
  textSpan.textContent = link.textContent;

  // Create icon placeholder (styled via CSS)
  const iconSpan = document.createElement('span');
  iconSpan.className = 'cards-links-icon';

  // Create arrow indicator
  const arrowSpan = document.createElement('span');
  arrowSpan.className = 'cards-links-arrow';
  arrowSpan.setAttribute('aria-hidden', 'true');

  // Rebuild link content
  link.textContent = '';
  link.append(iconSpan, textSpan, arrowSpan);
  link.className = 'cards-links-link';

  // Replace block content with just the link
  block.textContent = '';
  block.append(link);

  // Group adjacent cards-links-wrapper elements into a shared grid container.
  // Only the first sibling in a run performs the grouping.
  const wrapper = block.closest('.cards-links-wrapper');
  if (!wrapper) return;
  const prev = wrapper.previousElementSibling;
  if (prev && prev.classList.contains('cards-links-wrapper')) return; // already grouped by first

  // Collect all consecutive cards-links-wrapper siblings starting from this one
  const group = [wrapper];
  let next = wrapper.nextElementSibling;
  while (next && next.classList.contains('cards-links-wrapper')) {
    group.push(next);
    next = next.nextElementSibling;
  }

  if (group.length > 1) {
    const grid = document.createElement('div');
    grid.className = 'cards-links-grid';
    wrapper.parentNode.insertBefore(grid, wrapper);
    group.forEach((w) => grid.append(w));
  }
}
