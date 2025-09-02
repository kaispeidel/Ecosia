#!/usr/bin/env python
# test_extraction.py
import re

def read_suggestions(filename):
    suggestions_list = []
    with open(filename, 'r', encoding='utf-8') as file_in:
        content = file_in.read()
    
    # Combine all URLs and their suggestions
    url_blocks = re.findall(r'URL:\s*(.*?)\nAI Suggestions:(.*?)(?=-{5,}|$)', content, re.DOTALL)
    
    for website_url, suggestion_block in url_blocks:
        print(f"Processing URL: {website_url.strip()}")
        # Handle numbered format: "1. Suggestion text"
        numbered_suggestions = re.findall(r'\d+\.\s*(.*?)(?=\n\d+\.|$)', suggestion_block, re.DOTALL)
        print(f"  - Found {len(numbered_suggestions)} numbered suggestions")
        
        # Handle "Suggestion N:" format 
        named_suggestions = re.findall(r'Suggestion\s+\d+:\s*(.*?)(?=\nSuggestion\s+\d+:|$)', suggestion_block, re.DOTALL)
        print(f"  - Found {len(named_suggestions)} named suggestions")
        
        # Combine both types of suggestions
        all_suggestions = numbered_suggestions + named_suggestions
        
        for idx, s in enumerate(all_suggestions, 1):
            s = s.strip().replace('\n', ' ')
            if s:
                # Store URL with each suggestion for tracking
                suggestions_list.append((website_url.strip(), s))
                print(f"  - Added suggestion {idx}: {s[:50]}...")
    
    return suggestions_list

if __name__ == "__main__":
    ai_suggestions_file = "backend/ai_suggestions/ai_suggestions.txt"
    suggestions = read_suggestions(ai_suggestions_file)
    
    print(f"\nFound {len(suggestions)} total suggestions")
    urls = set(url for url, _ in suggestions)
    print(f"From {len(urls)} unique URLs: {urls}")
    
    # Group by URL
    by_url = {}
    for url, sugg in suggestions:
        if url not in by_url:
            by_url[url] = []
        by_url[url].append(sugg)
    
    for url, suggestions in by_url.items():
        print(f"\n{url} - {len(suggestions)} suggestions")  