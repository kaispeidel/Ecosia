import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Ecosia Scraping Visualization</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">Visualize scraping results, AI suggestions, and sustainable places with a modern, minimal interface.</p>
      </header>
      <main className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col gap-8">
        {/* Visualization and content will go here */}
        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
          <span className="text-gray-400 dark:text-gray-500">Visualization Placeholder</span>
        </div>
      </main>
      <footer className="mt-8 text-gray-400 text-sm">&copy; {new Date().getFullYear()} Ecosia Visualization</footer>
    </div>
  )
}

export default App
