import { useState } from 'react';
import ScraperResults from './components/ScraperResults';
import AiSuggestions from './components/AiSuggestions';
import PlacesMap from './components/PlacesMap';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [animatingTo, setAnimatingTo] = useState(null);

  const urls = [
    "https://imagine5.com/interview/rob-hopkins-the-future-is-beautiful-but-to-get-there-we-have-to-believe-in-it/",
    "https://blog.ecosia.org/brazil/",
    "https://www.goodnewsnetwork.org/design-firm-blends-new-tourist-infrastructure-into-the-very-rock-of-this-famous-taiwan-geopark/",
    "https://adventure.com/all-electric-nsw-road-trip-jeep-reflections/"
  ];

  const handleUrlClick = (urlIndex) => {
    setAnimatingTo(1);
    setTimeout(() => {
      setCurrentStep(1);
      setAnimatingTo(null);
    }, 800);
  };

  const handleBackToUrls = () => {
    setAnimatingTo(0);
    setTimeout(() => {
      setCurrentStep(0);
      setAnimatingTo(null);
    }, 800);
  };

  const getUrlTitle = (url) => {
    if (url.includes('rob-hopkins')) return "The Future is Beautiful";
    if (url.includes('ecosia.org/brazil')) return "Ecosia in Brazil";
    if (url.includes('taiwan-geopark')) return "Taiwan Geopark Design";
    if (url.includes('electric-nsw-road-trip')) return "Electric Road Trip";
    return "Sustainable Journey";
  };

  const getUrlDescription = (url) => {
    if (url.includes('rob-hopkins')) return "Interview with transition town pioneer";
    if (url.includes('ecosia.org/brazil')) return "Forest restoration in the Amazon";
    if (url.includes('taiwan-geopark')) return "Sustainable tourism infrastructure";
    if (url.includes('electric-nsw-road-trip')) return "Zero-emission adventure travel";
    return "Sustainable living insights";
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Floating natural elements */}
      <div className="fixed top-20 left-10 w-3 h-3 rounded-full floating-element" style={{
        background: 'radial-gradient(circle, rgba(160, 146, 122, 0.6), transparent)',
        animationDelay: '0s'
      }}></div>
      <div className="fixed top-40 right-20 w-2 h-2 rounded-full floating-element" style={{
        background: 'radial-gradient(circle, rgba(139, 126, 102, 0.5), transparent)',
        animationDelay: '3s'
      }}></div>
      <div className="fixed bottom-40 left-1/4 w-4 h-4 rounded-full floating-element" style={{
        background: 'radial-gradient(circle, rgba(101, 113, 83, 0.7), transparent)',
        animationDelay: '6s'
      }}></div>

      {/* Navigation Bar */}
      <nav className="w-full sticky top-0 z-50 mystical-nav">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center compass-step">
                <span role='img' aria-label='compass' className="text-2xl">🧭</span>
              </div>
              <div>
                <span className="text-2xl font-bold earth-glow earth-gradient">
                  The Journey
                </span>
                <div className="text-xs opacity-75" style={{ color: '#a0927a' }}>Nature's Digital Compass</div>
              </div>
            </div>
            {currentStep > 0 && (
              <button 
                onClick={handleBackToUrls}
                className="flex items-center gap-2 text-sm font-medium hover:text-yellow-300 transition-colors opacity-90 hover:opacity-100" 
                style={{ color: '#a0927a' }}
              >
                ← Back to Sources
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-20 pb-16 text-center px-6 relative">
        <div className="absolute top-10 left-1/5 w-24 h-24 rounded-full opacity-15" style={{
          background: 'radial-gradient(circle, #a0927a, transparent)',
          filter: 'blur(30px)'
        }}></div>
        <div className="absolute bottom-10 right-1/4 w-32 h-32 rounded-full opacity-12" style={{
          background: 'radial-gradient(circle, #8b7e66, transparent)',
          filter: 'blur(35px)'
        }}></div>

        <div className="relative z-10">
          <h1 className="text-6xl font-bold mb-6 max-w-4xl mx-auto leading-tight earth-gradient">
            {currentStep === 0 ? "Choose Your Path" : "Ancient Wisdom"}
            <br />
            <span className="earth-glow" style={{ color: '#d4af37' }}>
              {currentStep === 0 ? "Sacred Sources" : "Digital Paths"}
            </span>
          </h1>
          
          <p className="text-lg max-w-2xl mx-auto font-medium mb-12 leading-relaxed opacity-90" style={{ color: '#c4b896' }}>
            {currentStep === 0 
              ? "Begin your journey by selecting one of these mystical digital artifacts"
              : "Where earth's ancient knowledge meets modern discovery • Following nature's compass to hidden sanctuaries"
            }
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto px-6 py-12 w-full relative">
        <div className={`transition-all duration-800 ${animatingTo !== null ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
          
          {/* Step 0: URL Selection */}
          {currentStep === 0 && (
            <div className="space-y-6 animate-slide-up">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold earth-glow earth-gradient mb-4">
                  Sacred Digital Scrolls
                </h2>
                <p className="text-lg opacity-80" style={{ color: '#a0927a' }}>
                  Each contains wisdom waiting to be unlocked
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {urls.map((url, index) => (
                  <div 
                    key={index}
                    onClick={() => handleUrlClick(index)}
                    className="journey-card cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group"
                    style={{
                      background: 'linear-gradient(145deg, rgba(160, 146, 122, 0.1), rgba(139, 126, 102, 0.05))',
                      border: '2px solid rgba(160, 146, 122, 0.3)',
                    }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="compass-step w-12 h-12 flex items-center justify-center text-lg font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-earth-darkest mb-1">
                          {getUrlTitle(url)}
                        </h3>
                        <p className="text-sm text-earth-base">
                          {getUrlDescription(url)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-4 p-3 rounded-lg bg-earth-lightest/30 border border-earth-light/50">
                      <p className="text-xs font-mono text-earth-base break-all">
                        {url}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-earth-base">
                        <span>🌱</span>
                        <span>Ready to harvest</span>
                      </div>
                      <div className="text-2xl group-hover:animate-pulse">
                        ✨
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <p className="text-sm opacity-70" style={{ color: '#a0927a' }}>
                  Click any scroll to begin the mystical transformation
                </p>
              </div>
            </div>
          )}

          {/* Step 1: Full Pipeline */}
          {currentStep === 1 && (
            <div className="space-y-16">
              {/* Horizontal Pipeline Overview */}
              <div className="max-w-5xl mx-auto mb-16 overflow-x-auto">
                <div className="flex items-center justify-center gap-6 min-w-fit px-4">
                  <div className="flex flex-col items-center group min-w-[140px]">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-4 compass-step" style={{
                      background: 'linear-gradient(145deg, rgba(160, 146, 122, 0.2), rgba(139, 126, 102, 0.15))',
                      border: '2px solid rgba(160, 146, 122, 0.4)'
                    }}>
                      🌐
                    </div>
                    <h3 className="text-lg font-bold mb-2 earth-glow">Web Harvest</h3>
                    <p className="text-sm opacity-75 text-center" style={{ color: '#a0927a' }}>Gathering digital seeds</p>
                  </div>
                  
                  <div className="text-3xl opacity-60 px-2 organic-arrow">→</div>
                  
                  <div className="flex flex-col items-center group min-w-[140px]">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-4 compass-step" style={{
                      background: 'linear-gradient(145deg, rgba(139, 126, 102, 0.2), rgba(101, 113, 83, 0.15))',
                      border: '2px solid rgba(139, 126, 102, 0.4)'
                    }}>
                      🔮
                    </div>
                    <h3 className="text-lg font-bold mb-2 earth-glow">Ancient Wisdom</h3>
                    <p className="text-sm opacity-75 text-center" style={{ color: '#a0927a' }}>Transmuting knowledge</p>
                  </div>
                  
                  <div className="text-3xl opacity-60 px-2 organic-arrow">→</div>
                  
                  <div className="flex flex-col items-center group min-w-[140px]">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-4 compass-step" style={{
                      background: 'linear-gradient(145deg, rgba(101, 113, 83, 0.2), rgba(75, 85, 66, 0.15))',
                      border: '2px solid rgba(101, 113, 83, 0.4)'
                    }}>
                      🗺️
                    </div>
                    <h3 className="text-lg font-bold mb-2 earth-glow">Sacred Places</h3>
                    <p className="text-sm opacity-75 text-center" style={{ color: '#a0927a' }}>Revealing sanctuaries</p>
                  </div>
                </div>
              </div>

              {/* Step 1: Web Harvest */}
              <section id="scraper" className="animate-slide-up">
                <div className="flex items-center justify-center mb-10">
                  <div className="flex items-center gap-6">
                    <div className="compass-step w-14 h-14 flex items-center justify-center text-xl font-bold" style={{
                      background: 'linear-gradient(145deg, rgba(160, 146, 122, 0.2), rgba(139, 126, 102, 0.15))',
                      border: '2px solid rgba(160, 146, 122, 0.4)',
                      color: '#a0927a'
                    }}>
                      I
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold earth-glow earth-gradient">
                        Digital Harvest
                      </h2>
                      <p className="text-sm opacity-70 mt-1" style={{ color: '#a0927a' }}>Gathering wisdom from the web's flowing streams</p>
                    </div>
                  </div>
                </div>
                <ScraperResults />
              </section>

              {/* Natural Flow Connector */}
              <div className="flex justify-center py-6 relative">
                <div className="flex flex-col items-center">
                  <div className="text-5xl mb-3 organic-arrow" style={{ 
                    color: '#a0927a',
                    filter: 'drop-shadow(0 0 8px rgba(160, 146, 122, 0.4))'
                  }}>⤵</div>
                  <p className="text-xs opacity-60" style={{ color: '#a0927a' }}>Wisdom flows downward</p>
                </div>
              </div>

              {/* Step 2: Ancient Wisdom */}
              <section id="ai" className="animate-slide-up">
                <div className="flex items-center justify-center mb-10">
                  <div className="flex items-center gap-6">
                    <div className="compass-step w-14 h-14 flex items-center justify-center text-xl font-bold" style={{
                      background: 'linear-gradient(145deg, rgba(139, 126, 102, 0.2), rgba(101, 113, 83, 0.15))',
                      border: '2px solid rgba(139, 126, 102, 0.4)',
                      color: '#8b7e66'
                    }}>
                      II
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold earth-glow earth-gradient">
                        Ancient Wisdom
                      </h2>
                      <p className="text-sm opacity-70 mt-1" style={{ color: '#a0927a' }}>The oracle transmutes raw knowledge into sacred insights</p>
                    </div>
                  </div>
                </div>
                <AiSuggestions />
              </section>

              {/* Natural Flow Connector */}
              <div className="flex justify-center py-6 relative">
                <div className="flex flex-col items-center">
                  <div className="text-5xl mb-3 organic-arrow" style={{ 
                    color: '#a0927a',
                    filter: 'drop-shadow(0 0 8px rgba(160, 146, 122, 0.4))'
                  }}>⤵</div>
                  <p className="text-xs opacity-60" style={{ color: '#a0927a' }}>Manifesting in the physical realm</p>
                </div>
              </div>

              {/* Step 3: Sacred Places */}
              <section id="map" className="animate-slide-up">
                <div className="flex items-center justify-center mb-10">
                  <div className="flex items-center gap-6">
                    <div className="compass-step w-14 h-14 flex items-center justify-center text-xl font-bold" style={{
                      background: 'linear-gradient(145deg, rgba(101, 113, 83, 0.2), rgba(75, 85, 66, 0.15))',
                      border: '2px solid rgba(101, 113, 83, 0.4)',
                      color: '#657153'
                    }}>
                      III
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold earth-glow earth-gradient">
                        Sacred Places
                      </h2>
                      <p className="text-sm opacity-70 mt-1" style={{ color: '#a0927a' }}>Ancient sites and hidden sanctuaries revealed through mystical cartography</p>
                    </div>
                  </div>
                </div>
                <PlacesMap />
              </section>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-8 text-center opacity-60">
        <p className="text-sm" style={{ color: '#a0927a' }}>
          🌱 Crafted with ancient wisdom and modern technology 🌱
        </p>
      </footer>
    </div>
  );
}

export default App;
