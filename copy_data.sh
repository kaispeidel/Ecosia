#!/bin/bash

# Create the directory if it doesn't exist
mkdir -p ./frontend-vite/public/data

# Copy the data file
cp ./backend/ai_suggestions/llm_places_connected.txt ./frontend-vite/public/data/

echo "Data copied to frontend-vite/public/data/"
