from llm_openrouter import get_openrouter_suggestions, get_api_key_from_env

if __name__ == "__main__":
    api_key = get_api_key_from_env()
    test_text = "This website is about planting trees, supporting reforestation, and making eco-friendly choices in daily life."
    print("Prompting OpenRouter LLM...")
    suggestions = get_openrouter_suggestions(test_text, api_key)
    print("LLM Suggestions:\n", suggestions)
