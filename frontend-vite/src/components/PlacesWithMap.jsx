import React, { useState, useEffect } from 'react';
import ProcessedPlaces from './ProcessedPlaces';
import GoogleMapComponent from './GoogleMapComponent';

const PlacesWithMap = ({ fileName }) => {
  const [processedData, setProcessedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    const fetchAndProcessPlaces = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/ai_suggestions/${fileName}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${fileName}`);
        }
        const text = await response.text();
        
        // Process the raw text to extract places and keywords
        const processed = processPlacesText(text);
        setProcessedData(processed);
  console.info('Processed places for', fileName, processed);
        setError(null);
      } catch (err) {
        console.error(`Error loading ${fileName}:`, err);
        setError(`Could not load ${fileName}`);
        setProcessedData(null);
      } finally {
        setLoading(false);
      }
    };

    if (fileName) {
      fetchAndProcessPlaces();
    }
  }, [fileName]);

  const processPlacesText = (text) => {
    if (!text.trim()) return { keywords: [], groupedPlaces: {}, allPlaces: [] };

    const lines = text.split('\n').filter(line => line.trim());
    const extractedKeywords = [];
    const places = new Map(); // Use Map to avoid duplicates
    const allPlaces = []; // For the map component
    
    let inKeywordsSection = false;
    let inPlacesSection = false;
    let currentCategory = null;
    
    lines.forEach(line => {
      const trimmedLine = line.trim();
      
      // Skip empty lines
      if (!trimmedLine) return;
      
      // Check for keywords section header
      if (trimmedLine.toLowerCase().includes('keywords') || trimmedLine.toLowerCase().includes('keyword')) {
        inKeywordsSection = true;
        inPlacesSection = false;
        return;
      }
      
      // Check for places/sustainable section header
      if (trimmedLine.toLowerCase().includes('sustainable') || 
          trimmedLine.toLowerCase().includes('places') ||
          trimmedLine.toLowerCase().includes('location')) {
        inKeywordsSection = false;
        inPlacesSection = true;
        return;
      }
      
      // Process keywords section
        if (inKeywordsSection) {
          // Split by commas, semicolons, or bullet points and clean up
          const keywordMatches = trimmedLine.split(/[,;•\-\*]/)
            .map(k => k.trim())
            .filter(k => k && k.length > 2 && !k.toLowerCase().includes('http'));

          keywordMatches.forEach(keyword => {
            if (!extractedKeywords.includes(keyword)) {
              extractedKeywords.push(keyword);
            }
          });

          // Done processing this keywords line
          return;
        }

        // Process places / categories
        if (inPlacesSection) {
          // Category headers end with ':'
          if (trimmedLine.endsWith(':')) {
            currentCategory = trimmedLine.replace(/:$/, '').trim();
            return;
          }

          // This looks like a place entry
          const urlMatch = trimmedLine.match(/(https?:\/\/[^\s]+)/);
          const placeName = trimmedLine.replace(/(https?:\/\/[^\s]+)/g, '').trim();

          // Extract place ID from the URL
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

    // Group places by category
    const groupedPlaces = {};
    Array.from(places.values()).forEach(place => {
      const category = place.category || 'Sustainable Places';
      if (!groupedPlaces[category]) {
        groupedPlaces[category] = [];
      }
      groupedPlaces[category].push(place);
    });

    return {
      keywords: extractedKeywords.slice(0, 5), // Limit to just 5 keywords total
      groupedPlaces: groupedPlaces,
      allPlaces: allPlaces
    };
  };

  if (loading) {
    return (
      <div className="text-gray-600 text-sm">
        Processing places...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-sm">
        {error}
      </div>
    );
  }

  if (!processedData || (processedData.keywords.length === 0 && Object.keys(processedData.groupedPlaces).length === 0)) {
    return (
      <div className="text-gray-600 text-sm">
        No keywords or places found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Interactive Map */}
      {processedData.allPlaces && processedData.allPlaces.length > 0 && (
        <div>
          <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wide text-sm">
            PLACES MAP
          </h3>
          <GoogleMapComponent 
            places={processedData.allPlaces} 
            height="400px"
            selectedPlace={selectedPlace}
          />
        </div>
      )}

      {/* Keywords and Places Display */}
      <div className="bg-gray-50 border border-gray-200 p-6 rounded-none">
        {/* Keywords Section */}
        {processedData.keywords.length > 0 && (
          <div className="mb-8">
            <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wide text-sm">
              EXTRACTED KEYWORDS
            </h3>
            <div className="bg-white border-2 border-gray-800 p-4">
              <div className="font-mono text-sm text-gray-800 leading-relaxed">
                {processedData.keywords.map((keyword, index) => (
                  <span key={index}>
                    {keyword}
                    {index < processedData.keywords.length - 1 && (
                      <span className="text-gray-500 mx-2">•</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Places Section */}
        {Object.entries(processedData.groupedPlaces).map(([category, places]) => {
          if (places.length === 0) return null;
          
          return (
            <div key={category} className="mb-6 last:mb-0">
              <h3 className="font-bold text-gray-900 mb-3 uppercase tracking-wide text-sm">
                {category}
              </h3>
              <ul className="space-y-2">
                {places.map((place, index) => (
                  <li 
                    key={index} 
                    className={`text-sm text-gray-800 p-2 rounded cursor-pointer transition-colors duration-200 ${
                      selectedPlace?.name === place.name ? 'bg-green-100 border-l-4 border-green-500' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedPlace(place)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-semibold">{place.name}</span>
                      <span className="text-xs text-gray-500 uppercase">{place.category}</span>
                    </div>
                    {/* external link removed per request */}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlacesWithMap;
