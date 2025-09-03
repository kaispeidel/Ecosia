import { useState } from 'react';
import W1Page from './components/W1Page';
import W2Page from './components/W2Page';
import W3Page from './components/W3Page';
import RetroASCIILoader from './components/RetroASCIILoader';
import pixelArt from './assets/Jungle Adventure in Pixel Art.png';

function App() {
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const urls = [
    {
      id: 1,
      title: "The Future is Beautiful",
      author: "Rob Hopkins",
      url: "https://imagine5.com/interview/rob-hopkins-the-future-is-beautiful-but-to-get-there-we-have-to-believe-in-it/"
    },
    {
      id: 2,
      title: "Ecosia in Brazil", 
      author: "Ecosia Team",
      url: "https://blog.ecosia.org/brazil/"
    },
    {
      id: 3,
      title: "Taiwan Geopark Design",
      author: "Good News Network", 
      url: "https://www.goodnewsnetwork.org/design-firm-blends-new-tourist-infrastructure-into-the-very-rock-of-this-famous-taiwan-geopark/"
    }
  ];

  const handleUrlClick = (url) => {
    setIsLoading(true);
    setSelectedUrl(url);
    
    // Prevent body scrolling during loading
    document.body.style.overflow = 'hidden';
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  const handleBackToUrls = () => {
    setSelectedUrl(null);
  };

  const renderPageComponent = () => {
    switch(selectedUrl?.id) {
      case 1:
        return <W1Page />;
      case 2:
        return <W2Page />;
      case 3:
        return <W3Page />;
      default:
        return <W1Page />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Loading Overlay */}
      {isLoading && (
        <div 
          className="fixed inset-0 bg-white flex items-center justify-center"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'white',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <RetroASCIILoader onComplete={handleLoadingComplete} />
        </div>
      )}

  {/* Header */}
  <header className="bg-white py-4">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-black">
                POST-DIGITAL PUBLISHING ARCHIVE
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Experimental Publishing Informed By Digital Technology
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {selectedUrl && (
                <button 
                  onClick={handleBackToUrls}
                  className="text-sm text-gray-600 hover:text-black"
                >
                  ← Back
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto px-6 py-8" style={{ maxWidth: '800px' }}>
        {!selectedUrl ? (
          <div>
            <h2 className="text-lg font-semibold text-black mb-6">BROWSING HISTORY</h2>
            
            {/* URL Cards - Individual Containers */}
            <div className="space-y-16" style={{ maxWidth: '100%' }}>
              {urls.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => handleUrlClick(item)}
                  className="border-2 border-gray-800 bg-white hover:bg-gray-100 cursor-pointer transition-all duration-200 w-full max-w-full shadow-lg overflow-hidden"
                  style={{ marginBottom: '2rem' }}
                >
                  {/* Card Header */}
                  <div className="border-b-2 border-gray-800 p-6 bg-gray-100">
                    <div className="grid grid-cols-2 gap-6 text-base">
                      <div>
                        <div className="font-bold text-gray-900 mb-2 uppercase tracking-wide">Title</div>
                        <div className="text-black font-semibold">{item.title}</div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 mb-2 uppercase tracking-wide">Author</div>
                        <div className="text-black font-semibold">{item.author}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* URL Section */}
                  <div className="p-6 bg-white">
                    <div 
                      className="font-mono text-gray-800 break-words overflow-hidden text-ellipsis leading-relaxed"
                      style={{ fontSize: '12px' }}
                    >
                      {item.url}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          renderPageComponent()
        )}
      </main>
    </div>
  );
}

export default App;
