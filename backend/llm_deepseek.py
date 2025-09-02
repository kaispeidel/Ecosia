# llm_deepseek.py
"""
Send scraped text to DeepSeek LLM API and get sustainable/climate-friendly suggestions.
"""

import os
import requests
from dotenv import load_dotenv

def get_deepseek_suggestions(text, api_key, prompt_template=None):

    if prompt_template is None:
        prompt_template = (
            "Analyze the following website content and suggest actionable, sustainable or climate-friendly goals, actions, habits, places, or products for the user. "
            "Focus on practical, positive, and specific suggestions.\n\nContent:\n{content}\n\nSuggestions:"
        )
    prompt = prompt_template.format(content=text)
    url = "https://api.deepseek.com/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    data = {
        "model": "deepseek-chat",  # or another available model
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
    return os.getenv('DEEPSEEK_API_KEY')

# Example usage:
# api_key = get_api_key_from_env()
# text = "..."  # scraped text
# print(get_deepseek_suggestions(text, api_key))
