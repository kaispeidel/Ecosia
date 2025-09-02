# test_scraper.py

from scraper import scrape_urls
from llm_openrouter import get_openrouter_suggestions, get_api_key_from_env
import os


def save_scrape_results(results, filename):
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    with open(filename, 'w', encoding='utf-8') as f:
        for result in results:
            f.write(f"URL: {result['url']}\n")
            f.write(f"Title: {result['title']}\n")
            f.write(f"Description: {result['description']}\n")
            f.write(f"All Text: {result.get('text_all', '')}\n")
            f.write(f"Focused Text: {result.get('text_focused', '')}\n")
            if 'error' in result:
                f.write(f"Error: {result['error']}\n")
            f.write("-" * 40 + "\n")

def save_ai_suggestions(results, filename):
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    with open(filename, 'w', encoding='utf-8') as f:
        for result in results:
            f.write(f"URL: {result['url']}\n")
            f.write(f"AI Suggestions: {result.get('llm_suggestions', '')}\n")
            f.write("-" * 40 + "\n")

if __name__ == "__main__":
    #! insert here the URLS which are supposed to be scraped
    urls = [
        "https://imagine5.com/interview/rob-hopkins-the-future-is-beautiful-but-to-get-there-we-have-to-believe-in-it/",
        "https://blog.ecosia.org/brazil/",
        "https://www.goodnewsnetwork.org/design-firm-blends-new-tourist-infrastructure-into-the-very-rock-of-this-famous-taiwan-geopark/"
        
    ]
    results = scrape_urls(urls)
    api_key = get_api_key_from_env()
    for result in results:
        # Only call LLM if no error in scraping
        if not result.get('error'):
            # Use focused text for LLM prompt (can change to 'text_all' if desired)
            try:
                result['llm_suggestions'] = get_openrouter_suggestions(result.get('text_focused', ''), api_key)
            except Exception as e:
                result['llm_suggestions'] = f"LLM error: {e}"
        else:
            result['llm_suggestions'] = ''
    scrape_path = "backend/scrape_results/scrape_results.txt"
    ai_path = "backend/ai_suggestions/ai_suggestions.txt"
    save_scrape_results(results, scrape_path)
    save_ai_suggestions(results, ai_path)
    print(f"Scrape results saved to {scrape_path}")
    print(f"AI suggestions saved to {ai_path}")
