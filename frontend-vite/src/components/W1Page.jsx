import React from 'react';
import SuggestionsText from './SuggestionsText';
import PlacesWithMap from './PlacesWithMap';

const W1Page = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="mx-auto px-6 py-8" style={{ maxWidth: '800px' }}>
        {/* Article Header */}
        <div className="border-2 border-gray-800 bg-white mb-8 shadow-lg overflow-hidden">
          {/* Title/Author Section */}
          <div className="border-b-2 border-gray-800 p-6 bg-gray-100">
            <div className="grid grid-cols-2 gap-6 text-base">
              <div>
                <div className="font-bold text-gray-900 mb-2 uppercase tracking-wide">Title</div>
                <div className="text-black font-semibold">The Future is Beautiful</div>
              </div>
              <div>
                <div className="font-bold text-gray-900 mb-2 uppercase tracking-wide">Author</div>
                <div className="text-black font-semibold">Rob Hopkins</div>
              </div>
            </div>
          </div>
          
          {/* URL Section */}
          <div className="p-6 bg-white">
            <div 
              className="font-mono text-gray-800 break-words overflow-hidden text-ellipsis leading-relaxed"
              style={{ fontSize: '12px' }}
            >
              https://imagine5.com/interview/rob-hopkins-the-future-is-beautiful-but-to-get-there-we-have-to-believe-in-it/
            </div>
          </div>
        </div>

        {/* Suggestions Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-black mb-6">SUGGESTIONS</h2>
          <SuggestionsText fileName="W1_suggestions.txt" />
        </div>

        {/* Places Section */}
        <div>
          <h2 className="text-lg font-semibold text-black mb-6">EXTRACTED PLACES</h2>
          <PlacesWithMap fileName="W1_places.txt" />
        </div>
      </main>
    </div>
  );
};

export default W1Page;
