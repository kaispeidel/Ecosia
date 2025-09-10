const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, 'frontend-vite/public/ai_suggestions/W3_places.txt');
const text = fs.readFileSync(filePath, 'utf8');

function processPlacesText(text) {
  if (!text.trim()) return { keywords: [], groupedPlaces: {}, allPlaces: [] };

  const lines = text.split('\n').filter(line => line.trim());
  const extractedKeywords = [];
  const places = new Map();
  const allPlaces = [];

  let inKeywordsSection = false;
  let inPlacesSection = false;
  let currentCategory = null;

  lines.forEach(line => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return;

    if (trimmedLine.toLowerCase().includes('keywords') || trimmedLine.toLowerCase().includes('keyword')) {
      inKeywordsSection = true;
      inPlacesSection = false;
      return;
    }

    if (trimmedLine.toLowerCase().includes('sustainable') || trimmedLine.toLowerCase().includes('places') || trimmedLine.toLowerCase().includes('location')) {
      inKeywordsSection = false;
      inPlacesSection = true;
      return;
    }

    if (inKeywordsSection) {
      const keywordMatches = trimmedLine.split(/[,;•\-\*]/)
        .map(k => k.trim())
        .filter(k => k && k.length > 2 && !k.toLowerCase().includes('http'));

      keywordMatches.forEach(keyword => {
        if (!extractedKeywords.includes(keyword)) {
          extractedKeywords.push(keyword);
        }
      });

      return;
    }

    if (inPlacesSection) {
      if (trimmedLine.endsWith(':')) {
        currentCategory = trimmedLine.replace(/:$/, '').trim();
        return;
      }

      const urlMatch = trimmedLine.match(/(https?:\/\/[^\s]+)/);
      const placeName = trimmedLine.replace(/(https?:\/\/[^\s]+)/g, '').trim();

      let placeId = null;
      if (urlMatch && urlMatch[1]) {
        const placeIdMatch = urlMatch[1].match(/place_id:([A-Za-z0-9_-]+)/);
        if (placeIdMatch) {
          placeId = placeIdMatch[1];
        }
      }

      if (placeName && !places.has(placeName)) {
        const placeData = {
          name: placeName,
          url: urlMatch ? urlMatch[1] : null,
          placeId: placeId,
          category: currentCategory || 'Sustainable Places'
        };
        places.set(placeName, placeData);
        allPlaces.push(placeData);
      }
    }
  });

  const groupedPlaces = {};
  Array.from(places.values()).forEach(place => {
    const category = place.category || 'Sustainable Places';
    if (!groupedPlaces[category]) groupedPlaces[category] = [];
    groupedPlaces[category].push(place);
  });

  return {
    keywords: extractedKeywords.slice(0,5),
    groupedPlaces,
    allPlaces
  };
}

console.log(processPlacesText(text));
