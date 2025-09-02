# connect_llm_to_places.py
import os
import re
from dotenv import load_dotenv
from test_google_places import geocode_location, search_places_google
from llm_keyword_extractor import extract_keywords_llm

def read_suggestions(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        suggestions = []
        for line in f:
            if line.startswith('AI Suggestions:'):
                # Split numbered list if present
                numbered = re.split(r'\n?\d+\. ', line[len('AI Suggestions:'):])
                for s in numbered:
                    s = s.strip()
                    if s:
                        suggestions.append(s)
        return suggestions

if __name__ == "__main__":
    load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env'))
    location = "Berlin, Germany"
    lat, lng = geocode_location(location)
    ai_suggestions_file = "backend/ai_suggestions/ai_suggestions.txt"
    output_path = "backend/ai_suggestions/llm_places_connected.txt"
    suggestions = read_suggestions(ai_suggestions_file)
    from llm_openrouter import get_api_key_from_env
    api_key = get_api_key_from_env()
    with open(output_path, 'w', encoding='utf-8') as f:
        for suggestion in suggestions:
            try:
                keyword = extract_keywords_llm(suggestion, api_key)
            except Exception as e:
                keyword = f"LLM error: {e}"
            f.write(f"Suggestion: {suggestion}\n")
            f.write(f"Keyword: {keyword}\n")
            try:
                places = search_places_google(keyword, lat, lng)
                for p in places:
                    f.write(f"- {p['name']} @ {p['address']} - {p['maps_url']}\n")
            except Exception as e:
                f.write(f"Error searching for places: {e}\n")
            f.write("-" * 40 + "\n")
    print(f"Connected suggestions and places saved to {output_path}")
