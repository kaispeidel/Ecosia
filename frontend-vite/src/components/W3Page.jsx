import React from 'react';
import SuggestionsText from './SuggestionsText';
import PlacesWithMap from './PlacesWithMap';

const W3Page = () => {
  return (
    <div className="min-h-screen bg-white">
  <main className="mx-auto px-6 py-8 pb-20 animate-slide-up" style={{ maxWidth: '800px', transition: 'transform 320ms ease-out' }}>
        <div className="border-2 border-gray-800 bg-white mb-8 shadow-lg overflow-hidden">
          <div className="border-b-2 border-gray-800 p-6 bg-gray-100">
            <div className="grid grid-cols-2 gap-6 text-base">
              <div>
                <div className="font-bold text-gray-900 mb-2 uppercase tracking-wide">Title</div>
                <div className="text-black font-semibold">Ecosia and Deforestation</div>
              </div>
              <div>
                <div className="font-bold text-gray-900 mb-2 uppercase tracking-wide">Author</div>
                <div className="text-black font-semibold">Ecosia Team</div>
              </div>
            </div>
          </div>
          <div className="p-6 bg-white">
            <div 
              className="font-mono text-gray-800 break-words overflow-hidden text-ellipsis leading-relaxed"
              style={{ fontSize: '12px' }}
            >
              https://blog.ecosia.org/deforestation/
            </div>
          </div>
        </div>
        
        {/* Suggestions Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-black mb-6">SUGGESTIONS</h2>
          <SuggestionsText fileName="W3_suggestions.txt" />
        </div>

        {/* Places Section */}
        <div>
          <h2 className="text-lg font-semibold text-black mb-6">EXTRACTED PLACES</h2>
          <PlacesWithMap fileName="W3_places.txt" />
        </div>
  {/* Spacer instead of footer */}
  <div className="h-16" />
      </main>
    </div>
  );
};

export default W3Page;
