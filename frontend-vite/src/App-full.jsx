import ScraperResults from './components/ScraperResults';
import AiSuggestions from './components/AiSuggestions';
import PlacesMap from './components/PlacesMap';

function App() {
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
            <div className="flex items-center gap-8">
              <a href="#scraper" className="text-sm font-medium hover:text-yellow-300 transition-colors opacity-90 hover:opacity-100" style={{ color: '#a0927a' }}>
                ◦ Harvest
              </a>
              <a href="#ai" className="text-sm font-medium hover:text-yellow-300 transition-colors opacity-90 hover:opacity-100" style={{ color: '#a0927a' }}>
                ◦ Wisdom
              </a>
              <a href="#map" className="text-sm font-medium hover:text-yellow-300 transition-colors opacity-90 hover:opacity-100" style={{ color: '#a0927a' }}>
                ◦ Places
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-20 pb-16 text-center px-6 relative">
        {/* Natural background elements */}
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
            Ancient Wisdom
            <br />
            <span className="earth-glow" style={{ color: '#d4af37' }}>Digital Paths</span>
          </h1>
          
          <p className="text-lg max-w-2xl mx-auto font-medium mb-12 leading-relaxed opacity-90" style={{ color: '#c4b896' }}>
            Where earth's ancient knowledge meets modern discovery • Following nature's compass to hidden sanctuaries
          </p>
          
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
        </div>
      </header>

      {/* Main Content - Journey Cards */}
      <main className="flex-grow max-w-6xl mx-auto px-6 py-12 w-full relative">
        <div className="space-y-16">
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
              <div className="px-4 py-2 rounded-full text-sm font-medium" style={{
                background: 'rgba(160, 146, 122, 0.15)',
                border: '1px solid rgba(160, 146, 122, 0.3)',
                color: '#a0927a'
              }}>
                Ancient Processing
              </div>
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
                    Ancient Wisdom Synthesis
                  </h2>
                  <p className="text-sm opacity-70 mt-1" style={{ color: '#a0927a' }}>Transmuting data into earth-connected insights</p>
                </div>
              </div>
            </div>
            <AiSuggestions />
          </section>

          {/* Natural Flow Connector */}
          <div className="flex justify-center py-6 relative">
            <div className="flex flex-col items-center">
              <div className="text-5xl mb-3 organic-arrow" style={{ 
                color: '#657153',
                filter: 'drop-shadow(0 0 8px rgba(101, 113, 83, 0.4))'
              }}>⤵</div>
              <div className="px-4 py-2 rounded-full text-sm font-medium" style={{
                background: 'rgba(101, 113, 83, 0.15)',
                border: '1px solid rgba(101, 113, 83, 0.3)',
                color: '#657153'
              }}>
                Sacred Manifestation
              </div>
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
                    Sacred Geography
                  </h2>
                  <p className="text-sm opacity-70 mt-1" style={{ color: '#a0927a' }}>Revealing nature's hidden sanctuaries nearby</p>
                </div>
              </div>
            </div>
            <PlacesMap />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="pt-16 pb-8 text-center border-t border-opacity-20" style={{ borderColor: '#a0927a' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full compass-step flex items-center justify-center">
              <span className="text-sm">🧭</span>
            </div>
            <span className="text-lg font-semibold earth-gradient">The Journey</span>
          </div>
          <p className="text-sm opacity-60 mb-6" style={{ color: '#a0927a' }}>
            Following ancient paths through digital landscapes • Discovering nature's wisdom in modern times
          </p>
          <div className="flex justify-center gap-8 text-xs opacity-50" style={{ color: '#8b7e66' }}>
            <span>✦ Web Harvest</span>
            <span>✦ Ancient Wisdom</span>
            <span>✦ Sacred Places</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
