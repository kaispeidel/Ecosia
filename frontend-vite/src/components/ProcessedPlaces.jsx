import React, { useState, useEffect } from 'react';

const ProcessedPlaces = ({ fileName }) => {
  const [processedData, setProcessedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    if (!text.trim()) return { keywords: [], places: [] };

    const lines = text.split('\n').filter(line => line.trim());
    const extractedKeywords = [];
    const places = new Map(); // Use Map to avoid duplicates
    
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
          .filter(k => k && k.length > 2 && !k.includes('http'));
        
        keywordMatches.forEach(keyword => {
          if (!extractedKeywords.includes(keyword)) {
            extractedKeywords.push(keyword);
          }
        });
      }
      
      // Process places section
      if (inPlacesSection) {
        // Check if line looks like a category header
        if (!trimmedLine.includes('http') && trimmedLine.length < 80 && 
            (trimmedLine.includes(':') || trimmedLine.match(/^[A-Z\s]+$/))) {
          currentCategory = trimmedLine.replace(':', '').trim();
        } else {
          // This looks like a place entry
          const urlMatch = trimmedLine.match(/(https?:\/\/[^\s]+)/);
          const placeName = trimmedLine.replace(/(https?:\/\/[^\s]+)/g, '').trim();
          
          if (placeName && !places.has(placeName)) {
            places.set(placeName, {
              name: placeName,
              url: urlMatch ? urlMatch[1] : null,
              category: currentCategory || 'Sustainable Places'
            });
          }
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
      groupedPlaces: groupedPlaces
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
    <div className="bg-gray-50 border border-gray-200 p-6 rounded-none">
      {/* Keywords Section */}
      {processedData.keywords.length > 0 && (
        <div className="mb-8">
          <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wide text-sm">
            EXTRACTED KEYWORDS
          </h3>
          <div className="flex flex-wrap gap-3 mb-4">
            {processedData.keywords.map((keyword, index) => (
              <span 
                key={index}
                className="inline-block bg-white text-gray-700 px-4 py-2 text-sm font-mono border-2 border-gray-800 hover:bg-gray-800 hover:text-white transition-colors duration-200 cursor-default shadow-sm"
              >
                {keyword}
              </span>
            ))}
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
                <li key={index} className="text-sm text-gray-800">
                  <span className="font-mono">{place.name}</span>
                  {place.url && (
                    <>
                      {' - '}
                      <a 
                        href={place.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline font-mono text-xs"
                      >
                        {place.url}
                      </a>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default ProcessedPlaces;
