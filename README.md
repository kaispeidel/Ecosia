This project aims to provide sustainable recommendations based on a user's browsing history. The workflow is as follows:

1. **Collect Browser History**: Gather links from the user's browser history.
2. **Web Scraping**: Use Python's `requests` library to scrape relevant content from these links, saving results to `srape_results.txt`.
3. **AI Recommendations**: Generate suggestions using OpenRouter and OpenAI's GPT-3.5 Turbo API, storing outputs in `ai_suggestions.txt`.
4. **Keyword Extraction**: Apply regular expressions (`re` package) to extract key terms from the AI-generated suggestions.
5. **Local Search**: Use the Google Maps API to search for sustainable places or services nearby based on extracted keywords.
6. **Interview Preparation**: The results can be used to support an Ecosia job interview or similar sustainability-focused discussions.

This pipeline automates the process of turning browsing data into actionable, eco-friendly recommendations.
