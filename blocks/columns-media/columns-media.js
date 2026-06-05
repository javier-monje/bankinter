export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-media-${cols.length}-cols`);

  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      // Detect YouTube links and convert to iframe embed
      const link = col.querySelector('a[href*="youtube.com/embed"], a[href*="youtube.com/watch"], a[href*="youtu.be"]');
      if (link) {
        col.classList.add('columns-media-video-col');
        let embedUrl = link.href;
        // Convert watch URLs to embed URLs
        if (embedUrl.includes('youtube.com/watch')) {
          const videoId = new URL(embedUrl).searchParams.get('v');
          embedUrl = `https://www.youtube.com/embed/${videoId}`;
        } else if (embedUrl.includes('youtu.be/')) {
          const videoId = embedUrl.split('youtu.be/')[1].split('?')[0];
          embedUrl = `https://www.youtube.com/embed/${videoId}`;
        }
        const wrapper = document.createElement('div');
        wrapper.className = 'columns-media-video-wrapper';
        const iframe = document.createElement('iframe');
        iframe.src = embedUrl;
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
        iframe.setAttribute('title', 'Video');
        wrapper.appendChild(iframe);
        col.textContent = '';
        col.appendChild(wrapper);
      } else {
        // Check for picture (image column)
        const pic = col.querySelector('picture');
        if (pic) {
          col.classList.add('columns-media-img-col');
        } else {
          col.classList.add('columns-media-text-col');
        }
      }
    });
  });
}
