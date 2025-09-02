# Ecosia: Sustainable Suggestions Platform

## Project Goal
A tool that analyzes websites and suggests sustainable or climate-friendly actions, habits, places, or products using a free LLM API (e.g., Ollama, DeepSeek). The system then connects these suggestions to real-world places in Berlin.

## Structure
- `frontend/`: Interactive web UI for displaying suggestions and their connected real-world places.
- `backend/`: Processing system that connects AI-generated suggestions with physical locations.

## Project Flow
1. The backend extracts sustainable ideas from eco-friendly websites.
2. An AI generates actionable sustainability suggestions.
3. The system extracts keywords from these suggestions.
4. The Google Places API finds relevant sustainable locations in Berlin.
5. The frontend visualizes the connections between suggestions and places.

## Features

- **Web Content Analysis**: Extracts sustainable ideas from eco-friendly websites
- **AI-Powered Suggestions**: Generates actionable sustainability suggestions
- **Keyword Extraction**: Identifies relevant search terms for each suggestion
- **Place Matching**: Connects suggestions to real-world locations in Berlin
- **Interactive Visualization**: 
  - Grid view for browsing all suggestions
  - List view for detailed information
  - Map view to see all locations geographically
- **Filtering**: Filter suggestions by category and search by keyword

## Getting Started

1. Open `frontend/index.html` in a web browser
2. Browse the sustainable suggestions
3. Use the filters to find specific types of suggestions
4. Click on suggestions to see detailed information
5. View locations on the map to find places near you

## Technologies Used

- **Backend**: Python with LLM API for keyword extraction and suggestions
- **Frontend**: HTML, CSS, JavaScript
- **Maps**: Leaflet.js for map visualization
- **Data Source**: Google Places API
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