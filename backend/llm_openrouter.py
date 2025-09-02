# llm_openrouter.py
"""
Send text to OpenRouter LLM API and get sustainable/climate-friendly suggestions.
"""
import os
import requests
from dotenv import load_dotenv

def get_openrouter_suggestions(text, api_key, prompt_template=None, model="openai/gpt-3.5-turbo"):
    if prompt_template is None:
        prompt_template = (
            "Analyze the following website content. Based on its main topics, generate 1-3 highly specific, practical, and creative suggestions for sustainable or climate-friendly actions, habits, places, or products that are directly relevant to the user’s interests. Avoid generic advice. For each suggestion, include a short explanation of why it fits the content. Format your answer as a numbered list."
        )
    prompt = prompt_template.format(content=text)
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    data = {
        "model": model,
        "messages": [
            {"role": "user", "content": prompt}
        ],
        "max_tokens": 512
    }
    resp = requests.post(url, headers=headers, json=data, timeout=30)
    resp.raise_for_status()
    result = resp.json()
    return result['choices'][0]['message']['content']

def get_api_key_from_env():
    load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env'))
    return os.getenv('OPENROUTER_API_KEY')

# Example usage:
# api_key = get_api_key_from_env()
# text = "..."  # scraped text
# print(get_openrouter_suggestions(text, api_key))
