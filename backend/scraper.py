# scraper.py
"""
Scraper: Fetches title and meta description for a list of URLs using requests and BeautifulSoup.
"""
import requests
from bs4 import BeautifulSoup
from typing import List, Dict

def scrape_url(url: str) -> Dict:
    try:
        resp = requests.get(url, timeout=8)
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, 'html.parser')
        title = soup.title.string.strip() if soup.title else ''
        desc_tag = soup.find('meta', attrs={'name': 'description'})
        description = desc_tag['content'].strip() if desc_tag and 'content' in desc_tag.attrs else ''

        # Remove unwanted tags
        for script in soup(["script", "style", "noscript"]):
            script.decompose()

        # 1. Extract all visible text from the document (no length limit)
        all_text = soup.get_text(separator=' ', strip=True)

        # 2. Extract and concatenate text from common content tags for a focused result
        content_tags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'blockquote']
        focused_text = []
        for tag in content_tags:
            focused_text.extend([el.get_text(separator=' ', strip=True) for el in soup.find_all(tag)])
        focused_text = ' '.join(focused_text)

        return {
            'url': url,
            'title': title,
            'description': description,
            'text_all': all_text,
            'text_focused': focused_text
        }
    except Exception as e:
        return {'url': url, 'title': '', 'description': '', 'text': '', 'error': str(e)}

def scrape_urls(urls: List[str]) -> List[Dict]:
    return [scrape_url(url) for url in urls]

# Example usage:
# if __name__ == "__main__":
#     urls = ["https://www.ecosia.org", "https://www.wikipedia.org"]
#     results = scrape_urls(urls)
#     print(results)
