export default function decorate(block) {
  const rows = [...block.children];
  const imageRow = rows[0];
  const contentRow = rows[1];

  // Detect background image in first row (picture or img fallback)
  const picture = imageRow?.querySelector('picture');
  const img = imageRow?.querySelector('img') || imageRow?.querySelector('p > img');

  if (picture || img) {
    // Mark block as having a background image
    block.classList.add('has-image');
    // Ensure picture/img is directly in the image row cell for CSS positioning
  } else {
    block.classList.add('no-image');
  }

  // Add semantic classes to content cells for CSS targeting
  if (contentRow) {
    const cells = [...contentRow.children];
    cells.forEach((cell) => {
      // Rate box detection: cell with multiple <p> and first <p> has a <strong> with % text
      const paragraphs = cell.querySelectorAll(':scope > p');
      if (paragraphs.length >= 3) {
        const firstStrong = paragraphs[0]?.querySelector('strong');
        if (firstStrong && firstStrong.textContent.includes('%')) {
          cell.classList.add('hero-product-rate-box');
        }
      }

      // CTA link detection: cell contains only a single <a> link (no other block content)
      const links = cell.querySelectorAll('a');
      const directContent = cell.textContent.trim();
      if (links.length === 1 && directContent === links[0].textContent.trim()) {
        cell.classList.add('hero-product-cta');
      }
    });
  }
}
