# connect_llm_to_places.py
import os
import re
from dotenv import load_dotenv
from test_google_places import geocode_location, search_places_google
from llm_keyword_extractor import extract_keywords_llm

def read_suggestions(filename):
    suggestions_list = []
    with open(filename, 'r', encoding='utf-8') as file_in:
        content = file_in.read()
    
    # Combine all URLs and their suggestions
    url_blocks = re.findall(r'URL:\s*(.*?)\nAI Suggestions:(.*?)(?=-{5,}|$)', content, re.DOTALL)
    
    for url_entry, suggestion_block in url_blocks:
        # Handle numbered format: "1. Suggestion text"
        numbered_suggestions = re.findall(r'\d+\.\s*(.*?)(?=\n\d+\.|$)', suggestion_block, re.DOTALL)
        
        # Handle "Suggestion N:" format 
        named_suggestions = re.findall(r'Suggestion\s+\d+:\s*(.*?)(?=\nSuggestion\s+\d+:|$)', suggestion_block, re.DOTALL)
        
        # Combine both types of suggestions
        all_suggestions = numbered_suggestions + named_suggestions
        
        for s in all_suggestions:
            s = s.strip().replace('\n', ' ')
            if s:
                # Store URL with each suggestion for tracking
                suggestions_list.append((url_entry.strip(), s))
    
    return suggestions_list

if __name__ == "__main__":
    load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env'))
    location = "Berlin, Germany"
    lat, lng = geocode_location(location)
    ai_suggestions_file = "backend/ai_suggestions/ai_suggestions.txt"
    output_path = "backend/ai_suggestions/llm_places_connected.txt"
    
    # Get suggestions with their source URLs
    url_suggestions = read_suggestions(ai_suggestions_file)
    from llm_openrouter import get_api_key_from_env
    api_key = get_api_key_from_env()
    
    # Group suggestions by URL
    url_to_suggestions = {}
    for url, suggestion in url_suggestions:
        if url not in url_to_suggestions:
            url_to_suggestions[url] = []
        url_to_suggestions[url].append(suggestion)
    
    # Clear the file first
    with open(output_path, 'w', encoding='utf-8') as file_out:
        file_out.write("# Sustainable Suggestions with Local Places\n\n")
    
    # Process each website's suggestions
    for website_idx, (website_url, suggestions) in enumerate(url_to_suggestions.items(), 1):
        with open(output_path, 'a', encoding='utf-8') as file_out:
            # Add website header
            file_out.write(f"\n\n## WEBSITE {website_idx}: {website_url}\n\n")
            
            # Process each suggestion for this website
            for idx, suggestion in enumerate(suggestions, 1):
                file_out.write(f"### Suggestion {idx}:\n")
                file_out.write(f"{suggestion}\n\n")
                
                try:
                    keyword = extract_keywords_llm(suggestion)
                    file_out.write(f"**Keywords**: {keyword}\n\n")
                except Exception:
                    file_out.write("**Keywords**: (extraction error)\n\n")
                    keyword = ""
                
                if not keyword:
                    file_out.write("*No actionable keywords found.*\n\n")
                else:
                    try:
                        places = search_places_google(keyword, lat, lng)
                        if not places:
                            file_out.write("*No places found for these keywords.*\n\n")
                        else:
                            file_out.write("**Sustainable Places**:\n")
                            for p in places:
                                file_out.write(f"- {p['name']} @ {p['address']} - {p['maps_url']}\n")
                            file_out.write("\n")
                    except Exception:
                        file_out.write("*Error searching for places.*\n\n")
                
                file_out.write("-" * 80 + "\n\n")
    
    print(f"Connected suggestions and places saved to {output_path}")
    print(f"Connected suggestions and places saved to {output_path}")
