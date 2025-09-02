# llm_keyword_extractor.py
from llm_openrouter import get_openrouter_suggestions, get_api_key_from_env

def extract_keywords_llm(suggestion, api_key):
    prompt = (
        "Extract the best 1–3 search keywords or place types from the following suggestion for finding relevant local places or organizations. "
        "Only return the keywords, comma-separated.\n\nSuggestion: {suggestion}\nKeywords:"
    ).format(suggestion=suggestion)
    # Use a lightweight model for cost/latency if desired
    return get_openrouter_suggestions(prompt, api_key, model="openai/gpt-3.5-turbo")

# Example usage:
# api_key = get_api_key_from_env()
# print(extract_keywords_llm("Join a local community garden to grow your own food and meet neighbors.", api_key))
