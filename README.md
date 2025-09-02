# Ecosia: Sustainable Browsing Proof of Concept

## Project Goal
A tool that analyzes recently visited websites (provided by the user) and suggests sustainable or climate-friendly actions, habits, places, or products using a free LLM API (e.g., Ollama, DeepSeek).

## Structure
- `frontend/`: Simple web UI for inputting URLs and displaying suggestions.
- `backend/`: API to process URLs, interact with LLM, and return suggestions.

## Proof of Concept Flow
1. User pastes a list of recently visited websites into the web UI.
2. The backend summarizes the browsing topics and sends them to a free LLM API.
3. The LLM returns actionable, sustainable suggestions.
4. The frontend displays the results to the user.

## Next Steps
- Set up the frontend with a text area and submit button.
- Set up the backend with an endpoint to receive URLs and call the LLM API.
- Connect frontend and backend.

This repository will be used to apply for Ecosia

Game Plan:

1. Requirements & Research
Define supported browsers (Chrome, Firefox, Safari, etc.).
Research how to access/export browsing history for each browser.
Explore free LLM APIs (Ollama, DeepSeek, etc.) and their integration methods.
Identify sources for sustainable/climate-friendly suggestions (databases, APIs, or curated lists).
2. Architecture Overview
Backend: Scrapes and processes browsing history, interacts with LLM API, generates suggestions.
Frontend: User interface for uploading history, viewing analysis, and receiving suggestions.
Optional: Local-first approach for privacy (process data on user’s machine).
3. Implementation Steps
A. Browsing History Extraction
Write scripts to extract or parse browsing history from browser databases or exported files (e.g., SQLite for Chrome/Firefox).
Normalize data (URLs, timestamps, titles).
B. Data Analysis & Summarization
Summarize browsing patterns (categories, time spent, topics).
Prepare prompts for the LLM to analyze habits and suggest improvements.
C. LLM Integration
Set up API calls to chosen free LLM (Ollama/DeepSeek).
Design prompts to get actionable, sustainable suggestions based on browsing data.
D. Suggestion Engine
Post-process LLM output to extract clear goals, actions, and recommendations.
Optionally, cross-reference with sustainable products/places databases.
E. Frontend Development
Build a simple, modern UI (React, Svelte, or plain HTML/CSS/JS).
Features: Upload history, view summaries, receive suggestions, save/share results.
F. Privacy & Security
Ensure user data is processed locally or securely.
Clearly communicate privacy policy.
4. Exploratory Steps
Prototype each part separately (history extraction, LLM prompt, UI).
Test with sample data and iterate on prompt engineering for best results.
Gather feedback and refine.
5. Next Steps
Choose tech stack (Node.js/Python for backend, React/Svelte for frontend).
Set up project structure and version control.
Start with history extraction and basic UI, then integrate LLM and suggestions.