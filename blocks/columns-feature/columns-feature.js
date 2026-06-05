export default function decorate(block) {
  const rows = [...block.children];

  // Row 1: background image
  // Row 2: content columns (text + rate boxes)
  let imageRow = null;
  let contentRow = null;

  rows.forEach((row) => {
    const cols = [...row.children];
    const hasPicture = cols.some(
      (col) => col.querySelector('picture') && col.children.length === 1,
    );
    if (hasPicture && !imageRow) {
      imageRow = row;
    } else if (!contentRow) {
      contentRow = row;
    }
  });

  // Move image to be a direct background element
  if (imageRow) {
    const pic = imageRow.querySelector('picture');
    if (pic) {
      const img = pic.querySelector('img');
      if (img) {
        img.classList.add('columns-feature-bg');
        img.setAttribute('loading', 'eager');
      }
      block.prepend(pic);
    }
    imageRow.remove();
  }

  // Classify content columns
  if (contentRow) {
    const cols = [...contentRow.children];
    if (cols[0]) {
      cols[0].classList.add('columns-feature-text');

      // Wrap trailing <p> CTA links in a button group
      const paragraphs = [...cols[0].querySelectorAll(':scope > p')];
      if (paragraphs.length > 0) {
        const btnGroup = document.createElement('div');
        btnGroup.classList.add('columns-feature-buttons');
        paragraphs.forEach((p) => btnGroup.appendChild(p));
        cols[0].appendChild(btnGroup);
      }
    }

    // Split rates cell into cards using <hr> as separator
    if (cols[1]) {
      cols[1].classList.add('columns-feature-rates');
      const hr = cols[1].querySelector('hr');
      if (hr) {
        const card1 = document.createElement('div');
        card1.classList.add('columns-feature-rate-card', 'columns-feature-rate-card-1');
        const card2 = document.createElement('div');
        card2.classList.add('columns-feature-rate-card', 'columns-feature-rate-card-2');

        let currentCard = card1;
        [...cols[1].children].forEach((child) => {
          if (child.tagName === 'HR') {
            currentCard = card2;
          } else {
            currentCard.appendChild(child);
          }
        });
        hr.remove();
        cols[1].appendChild(card1);
        cols[1].appendChild(card2);
      }
    }

    contentRow.classList.add('columns-feature-content');
  }
}
