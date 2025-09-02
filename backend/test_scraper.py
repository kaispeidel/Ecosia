# test_scraper.py
from scraper import scrape_urls

import os

def save_results_to_file(results, filename):
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

if __name__ == "__main__":
    #! insert here the URLS which are supposed to be scraped
    urls = [
        "https://imagine5.com/interview/rob-hopkins-the-future-is-beautiful-but-to-get-there-we-have-to-believe-in-it/",
        "https://blog.ecosia.org/brazil/",
        "https://www.404media.co/citizen-is-using-ai-to-generate-crime-alerts-with-no-human-review-its-making-a-lot-of-mistakes/"
    ]
    results = scrape_urls(urls)
    output_path = "backend/scrape_results/scrape_results.txt"
    save_results_to_file(results, output_path)
    print(f"Results saved to {output_path}")
