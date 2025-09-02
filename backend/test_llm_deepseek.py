# test_llm_deepseek.py
from llm_deepseek import get_deepseek_suggestions, get_api_key_from_env

if __name__ == "__main__":
    api_key = get_api_key_from_env()
    test_text = "This website is about planting trees, supporting reforestation, and making eco-friendly choices in daily life."
    print("Prompting DeepSeek LLM...")
    suggestions = get_deepseek_suggestions(test_text, api_key)
    print("LLM Suggestions:\n", suggestions)
