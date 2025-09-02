import os
import requests
from dotenv import load_dotenv

# Load API key from .env
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env'))
api_key = os.getenv('DEEPSEEK_API_KEY')

prompt = "This website is about planting trees, supporting reforestation, and making eco-friendly choices in daily life. Suggest actionable, sustainable or climate-friendly goals, actions, habits, places, or products for the user."

url = "https://api.deepseek.com/v1/chat/completions"
headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}
data = {
    "model": "deepseek-chat",
    "messages": [
        {"role": "user", "content": prompt}
    ],
    "max_tokens": 512
}

print("Sending request to DeepSeek API...")
response = requests.post(url, headers=headers, json=data, timeout=30)
print("Status code:", response.status_code)
print("Response:")
print(response.text)
