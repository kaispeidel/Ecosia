// scraper.js
// Simple scraper: fetches title and meta description for a list of URLs

const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');

/**
 * Fetches the title and meta description for a given URL.
 * @param {string} url
 * @returns {Promise<{url: string, title: string, description: string}>}
 */
async function scrapeUrl(url) {
  try {
    const response = await fetch(url, { timeout: 8000 });
    const html = await response.text();
    const dom = new JSDOM(html);
    const title = dom.window.document.querySelector('title')?.textContent || '';
    const description = dom.window.document.querySelector('meta[name="description"]')?.content || '';
    return { url, title, description };
  } catch (err) {
    return { url, title: '', description: '', error: err.message };
  }
}

/**
 * Scrapes a list of URLs.
 * @param {string[]} urls
 * @returns {Promise<Array<{url: string, title: string, description: string, error?: string}>>}
 */
async function scrapeUrls(urls) {
  return Promise.all(urls.map(scrapeUrl));
}

// Example usage (uncomment to test):
// (async () => {
//   const results = await scrapeUrls(['https://www.ecosia.org', 'https://www.wikipedia.org']);
//   console.log(results);
// })();

module.exports = { scrapeUrl, scrapeUrls };
