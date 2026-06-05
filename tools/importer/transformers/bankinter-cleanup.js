/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Bankinter cleanup
 * Removes non-authorable elements from the Bankinter homepage.
 * Selectors validated against migration-work/cleaned.html
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove risk indicator disclaimers - regulatory info not authored by content editors
    // Found in cleaned.html: <div class="banner-hero__risk-indicator"> (sections 1, 2)
    WebImporter.DOMUtils.remove(element, [
      '.banner-hero__risk-indicator',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove any residual non-authorable elements that may appear on live page
    // These are not in cleaned.html but would be on the live site
    WebImporter.DOMUtils.remove(element, [
      'header',
      'footer',
      'nav',
      'noscript',
      'link',
      'iframe[src*="google"]',
      'iframe[src*="doubleclick"]',
      '[id*="cookie"]',
      '[class*="cookie"]',
      '[id*="onetrust"]',
      '[class*="chatbot"]',
      '[id*="chat"]',
    ]);

    // Clean tracking attributes from all elements
    element.querySelectorAll('[data-track]').forEach((el) => {
      el.removeAttribute('data-track');
    });
    element.querySelectorAll('[onclick]').forEach((el) => {
      el.removeAttribute('onclick');
    });
    element.querySelectorAll('[data-analytics]').forEach((el) => {
      el.removeAttribute('data-analytics');
    });
  }
}
