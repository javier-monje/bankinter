/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-product.js
  function parse(element, { document }) {
    const bgImage = element.querySelector('img.banner-hero__img, img[class*="banner-hero__img"]');
    const description = element.querySelector("h1.banner-hero__description, .banner-hero__description");
    const title = element.querySelector("h2.banner-hero__tittle, .banner-hero__tittle");
    const benefitsList = element.querySelector(".banner-hero__lead ul, .list_bullets");
    const availabilityText = element.querySelector(".banner-hero__lead > p");
    const rateBox = element.querySelector(".banner-hero__square, .banner-hero__extra-content");
    const ctaLinks = Array.from(element.querySelectorAll(".banner-hero__link a, .banner-hero__link .btn"));
    const riskIndicator = element.querySelector(".banner-hero__risk-indicator");
    const cells = [];
    if (bgImage) {
      cells.push([bgImage]);
    }
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
    if (riskIndicator) {
      cells.push([riskIndicator]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-product", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-promo.js
  function parse2(element, { document }) {
    const bgImage = element.querySelector(':scope > img.banner-hero__img, :scope img[class*="banner-hero__img"]');
    const heading = element.querySelector('h2.banner-hero__description, h2[class*="description"]');
    const subtitle = element.querySelector('h3.banner-hero__tittle, h3[class*="tittle"], h3[class*="title"]');
    const leadContainer = element.querySelector(".banner-hero__lead");
    const leadParagraphs = leadContainer ? Array.from(leadContainer.querySelectorAll(":scope > p")) : [];
    const bulletList = element.querySelector("ul.list_bullets, .banner-hero__lead ul");
    const ctaLink = element.querySelector(".banner-hero__link a, a.btn--primary, a.btn");
    const cells = [];
    if (bgImage) {
      cells.push([bgImage]);
    }
    const contentCell = [];
    if (heading) {
      contentCell.push(heading);
    }
    if (subtitle) {
      contentCell.push(subtitle);
    }
    leadParagraphs.forEach((p) => {
      contentCell.push(p);
    });
    if (bulletList) {
      contentCell.push(bulletList);
    }
    if (ctaLink) {
      contentCell.push(ctaLink);
    }
    if (contentCell.length > 0) {
      cells.push(contentCell);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-promo", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-feature.js
  function parse3(element, { document }) {
    const leftContent = [];
    const heading = element.querySelector("h2.featured-group__description, .featured-group__main > h2");
    if (heading) leftContent.push(heading);
    const subtitle = element.querySelector("h3.featured-group__tittle, .featured-group__main > h3");
    if (subtitle) leftContent.push(subtitle);
    const bulletList = element.querySelector(".featured-group__lead ul, .featured-group__main ul");
    if (bulletList) leftContent.push(bulletList);
    const ctaContainer = element.querySelector(".featured-group__link");
    if (ctaContainer) {
      const buttons = ctaContainer.querySelectorAll("a");
      buttons.forEach((btn) => leftContent.push(btn));
    }
    const rightContent = [];
    const featuredBoxes = element.querySelectorAll(".featured-group__featured-box");
    featuredBoxes.forEach((box) => {
      const boxTitle = box.querySelector("h4.featured-group__featured-box-tittle, h4");
      if (boxTitle) rightContent.push(boxTitle);
      const boxDesc = box.querySelector(".featured-group__featured-box-description");
      if (boxDesc) {
        const paragraphs = boxDesc.querySelectorAll("p");
        paragraphs.forEach((p) => rightContent.push(p));
      }
      const hr = document.createElement("hr");
      rightContent.push(hr);
    });
    if (rightContent.length > 0 && rightContent[rightContent.length - 1].tagName === "HR") {
      rightContent.pop();
    }
    const bgImage = element.querySelector("img.featured-group__img, .featured-group > img");
    const cells = [];
    if (bgImage) {
      cells.push([bgImage]);
    }
    cells.push([leftContent, rightContent]);
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-feature", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-media.js
  function parse4(element, { document }) {
    const leftContent = [];
    const iframe = element.querySelector('.video__container iframe, .video__container__player iframe, iframe[src*="youtube"]');
    if (iframe) {
      const videoUrl = iframe.getAttribute("src") || "";
      const a = document.createElement("a");
      a.href = videoUrl;
      a.textContent = videoUrl;
      leftContent.push(a);
    }
    const rightContent = [];
    const eyebrow = element.querySelector(".video__right-side h2, h2.h6, h2.text-uppercase");
    if (eyebrow) {
      const h2 = document.createElement("h2");
      h2.textContent = eyebrow.textContent.trim();
      rightContent.push(h2);
    }
    const title = element.querySelector(".video__right-side h3, h3.video__title, .video__title");
    if (title) {
      const h3 = document.createElement("h3");
      h3.textContent = title.textContent.trim();
      rightContent.push(h3);
    }
    const description = element.querySelector(".video__right-side > p, .video__right-side p.mb-40");
    if (description) {
      const p = document.createElement("p");
      p.textContent = description.textContent.trim();
      rightContent.push(p);
    }
    const ctaLink = element.querySelector('.video__right-side a.btn, .video__right-side a[class*="btn"], a.btn--primary');
    if (ctaLink) {
      const p = document.createElement("p");
      const a = document.createElement("a");
      a.href = ctaLink.getAttribute("href") || "";
      a.textContent = ctaLink.textContent.trim();
      p.appendChild(a);
      rightContent.push(p);
    }
    const cells = [];
    cells.push([leftContent, rightContent]);
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-media", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-promo.js
  function parse5(element, { document }) {
    const image = element.querySelector(":scope > img.card-v2__img, :scope img.card-v2__img");
    const heading = element.querySelector("h2.card-v2__descriptor, h2");
    const subtitle = element.querySelector("h3.card-v2__title, h3");
    const descriptionEl = element.querySelector(".card-v2__aditional-content > div, .card-v2__aditional-content");
    const cta = element.querySelector(".card-v2__footer a, a.btn, a.btn--primary");
    const contentCell = [];
    if (image) {
      contentCell.push(image);
    }
    if (heading) {
      contentCell.push(heading);
    }
    if (subtitle) {
      contentCell.push(subtitle);
    }
    if (descriptionEl) {
      const descText = descriptionEl.textContent.trim();
      if (descText) {
        const p = document.createElement("p");
        p.textContent = descText;
        contentCell.push(p);
      }
    }
    if (cta) {
      const p = document.createElement("p");
      const strong = document.createElement("strong");
      const link = document.createElement("a");
      link.href = cta.href;
      link.textContent = cta.textContent.trim();
      strong.append(link);
      p.append(strong);
      contentCell.push(p);
    }
    const cells = [contentCell];
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-promo", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-contact.js
  function parse6(element, { document }) {
    const heading = element.querySelector(".call-me__title, h2");
    const description = element.querySelector(".call-me__title + span, .col-12:first-child span:not(.call-me__title)");
    const col1 = [];
    if (heading) col1.push(heading);
    if (description) {
      const p = document.createElement("p");
      p.textContent = description.textContent;
      col1.push(p);
    }
    const ctaLink = element.querySelector('.btn, a.btn--primary, a[href*="customer-service"]');
    const col2 = [];
    if (ctaLink) {
      const a = document.createElement("a");
      a.href = ctaLink.href || ctaLink.getAttribute("href");
      a.textContent = ctaLink.textContent.trim();
      col2.push(a);
    }
    const contactInfo = element.querySelector(".call-me__contact-info");
    const branchLink = element.querySelector('a.text-link, a[href*="office-atm"], a[href*="branch"]');
    const col3 = [];
    if (contactInfo) {
      const p = document.createElement("p");
      p.textContent = contactInfo.textContent.trim();
      col3.push(p);
    }
    if (branchLink) {
      const a = document.createElement("a");
      a.href = branchLink.href || branchLink.getAttribute("href");
      a.textContent = branchLink.textContent.trim();
      col3.push(a);
    }
    const cells = [
      [col1, col2, col3]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-contact", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-links.js
  function parse7(element, { document }) {
    const link = element.querySelector("a.content-box-simple__link, a[href]");
    const labelSpan = element.querySelector('.content-box-simple__texto, span[class*="texto"]');
    const labelText = labelSpan ? labelSpan.textContent.trim() : "";
    const href = link ? link.getAttribute("href") : "";
    const contentCell = [];
    if (link && labelText) {
      const linkEl = document.createElement("a");
      linkEl.setAttribute("href", href);
      linkEl.textContent = labelText;
      contentCell.push(linkEl);
    }
    const cells = [contentCell];
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-links", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/bankinter-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        ".banner-hero__risk-indicator"
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "header",
        "footer",
        "nav",
        "noscript",
        "link",
        'iframe[src*="google"]',
        'iframe[src*="doubleclick"]',
        '[id*="cookie"]',
        '[class*="cookie"]',
        '[id*="onetrust"]',
        '[class*="chatbot"]',
        '[id*="chat"]'
      ]);
      element.querySelectorAll("[data-track]").forEach((el) => {
        el.removeAttribute("data-track");
      });
      element.querySelectorAll("[onclick]").forEach((el) => {
        el.removeAttribute("onclick");
      });
      element.querySelectorAll("[data-analytics]").forEach((el) => {
        el.removeAttribute("data-analytics");
      });
    }
  }

  // tools/importer/transformers/bankinter-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const { template } = payload;
      if (!template || !template.sections || template.sections.length < 2) return;
      const { sections } = template;
      const document = element.ownerDocument;
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        const sectionEl = element.querySelector(section.selector);
        if (!sectionEl) continue;
        if (section.style) {
          const metadataBlock = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.append(metadataBlock);
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-product": parse,
    "hero-promo": parse2,
    "columns-feature": parse3,
    "columns-media": parse4,
    "cards-promo": parse5,
    "columns-contact": parse6,
    "cards-links": parse7
  };
  var transformers = [
    transform,
    transform2
  ];
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Bankinter main banking homepage with hero, product cards, promotions, and financial services overview",
    urls: [
      "https://www.bankinter.com/banca/inicio"
    ],
    blocks: [
      {
        name: "hero-product",
        instances: [".elem1 .banner-hero", ".elem4 .banner-hero"]
      },
      {
        name: "hero-promo",
        instances: [".elem6 .banner-hero", ".elem3 .banner-hero"]
      },
      {
        name: "columns-feature",
        instances: [".featured-group"]
      },
      {
        name: "columns-media",
        instances: [".video.video_orange"]
      },
      {
        name: "cards-promo",
        instances: [".card-v2.card-v2--horizontal"]
      },
      {
        name: "columns-contact",
        instances: [".call-me"]
      },
      {
        name: "cards-links",
        instances: [".content-box.content-box--border"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero - Digital Account",
        selector: "section:has(.elem1)",
        style: null,
        blocks: ["hero-product"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Product Promotions",
        selector: "section:has(.elem5)",
        style: null,
        blocks: ["hero-promo", "hero-product"],
        defaultContent: [".elem5 .content-box-simple__link"]
      },
      {
        id: "section-3",
        name: "Variable-Rate Mortgage",
        selector: "section:has(.elem22)",
        style: null,
        blocks: ["columns-feature"],
        defaultContent: []
      },
      {
        id: "section-4",
        name: "Investment Funds Video",
        selector: "section:has(.elem10)",
        style: null,
        blocks: ["columns-media"],
        defaultContent: []
      },
      {
        id: "section-5",
        name: "Service Promotion Cards",
        selector: "section:has(.card-v2)",
        style: null,
        blocks: ["cards-promo"],
        defaultContent: []
      },
      {
        id: "section-6",
        name: "Broker Zero",
        selector: "section:has(.elem3)",
        style: null,
        blocks: ["hero-promo"],
        defaultContent: []
      },
      {
        id: "section-7",
        name: "Bankinter Listens (Contact)",
        selector: "section:has(.call-me)",
        style: "grey",
        blocks: ["columns-contact"],
        defaultContent: []
      },
      {
        id: "section-8",
        name: "Quick Links",
        selector: "section:has(.content-box--border)",
        style: null,
        blocks: ["cards-links"],
        defaultContent: []
      }
    ]
  };
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
