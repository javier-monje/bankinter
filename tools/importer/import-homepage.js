/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroProductParser from './parsers/hero-product.js';
import heroPromoParser from './parsers/hero-promo.js';
import columnsFeatureParser from './parsers/columns-feature.js';
import columnsMediaParser from './parsers/columns-media.js';
import cardsPromoParser from './parsers/cards-promo.js';
import columnsContactParser from './parsers/columns-contact.js';
import cardsLinksParser from './parsers/cards-links.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/bankinter-cleanup.js';
import sectionsTransformer from './transformers/bankinter-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-product': heroProductParser,
  'hero-promo': heroPromoParser,
  'columns-feature': columnsFeatureParser,
  'columns-media': columnsMediaParser,
  'cards-promo': cardsPromoParser,
  'columns-contact': columnsContactParser,
  'cards-links': cardsLinksParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  sectionsTransformer,
];

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Bankinter main banking homepage with hero, product cards, promotions, and financial services overview',
  urls: [
    'https://www.bankinter.com/banca/inicio',
  ],
  blocks: [
    {
      name: 'hero-product',
      instances: ['.elem1 .banner-hero', '.elem4 .banner-hero'],
    },
    {
      name: 'hero-promo',
      instances: ['.elem6 .banner-hero', '.elem3 .banner-hero'],
    },
    {
      name: 'columns-feature',
      instances: ['.featured-group'],
    },
    {
      name: 'columns-media',
      instances: ['.video.video_orange'],
    },
    {
      name: 'cards-promo',
      instances: ['.card-v2.card-v2--horizontal'],
    },
    {
      name: 'columns-contact',
      instances: ['.call-me'],
    },
    {
      name: 'cards-links',
      instances: ['.content-box.content-box--border'],
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero - Digital Account',
      selector: 'section:has(.elem1)',
      style: null,
      blocks: ['hero-product'],
      defaultContent: [],
    },
    {
      id: 'section-2',
      name: 'Product Promotions',
      selector: 'section:has(.elem5)',
      style: null,
      blocks: ['hero-promo', 'hero-product'],
      defaultContent: ['.elem5 .content-box-simple__link'],
    },
    {
      id: 'section-3',
      name: 'Variable-Rate Mortgage',
      selector: 'section:has(.elem22)',
      style: null,
      blocks: ['columns-feature'],
      defaultContent: [],
    },
    {
      id: 'section-4',
      name: 'Investment Funds Video',
      selector: 'section:has(.elem10)',
      style: null,
      blocks: ['columns-media'],
      defaultContent: [],
    },
    {
      id: 'section-5',
      name: 'Service Promotion Cards',
      selector: 'section:has(.card-v2)',
      style: null,
      blocks: ['cards-promo'],
      defaultContent: [],
    },
    {
      id: 'section-6',
      name: 'Broker Zero',
      selector: 'section:has(.elem3)',
      style: null,
      blocks: ['hero-promo'],
      defaultContent: [],
    },
    {
      id: 'section-7',
      name: 'Bankinter Listens (Contact)',
      selector: 'section:has(.call-me)',
      style: 'grey',
      blocks: ['columns-contact'],
      defaultContent: [],
    },
    {
      id: 'section-8',
      name: 'Quick Links',
      selector: 'section:has(.content-box--border)',
      style: null,
      blocks: ['cards-links'],
      defaultContent: [],
    },
  ],
};

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (section breaks + final cleanup)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, ''),
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
