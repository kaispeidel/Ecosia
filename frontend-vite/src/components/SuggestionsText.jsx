import React, { useState, useEffect } from 'react';

const SuggestionsText = ({ fileName }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/ai_suggestions/${fileName}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${fileName}`);
        }
        const text = await response.text();
        setContent(text);
        setError(null);
      } catch (err) {
        console.error(`Error loading ${fileName}:`, err);
        setError(`Could not load ${fileName}`);
        setContent('');
      } finally {
        setLoading(false);
      }
    };

    if (fileName) {
      fetchContent();
    }
  }, [fileName]);

  if (loading) {
    return (
      <div className="text-gray-600 text-sm">
        Loading suggestions...
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

  if (!content.trim()) {
    return (
      <div className="text-gray-600 text-sm">
        No suggestions available.
      </div>
    );
  }

  return (
    <div className="bg-gray-50 border border-gray-200 p-6 rounded-none">
      <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
        {content}
      </pre>
    </div>
  );
};

export default SuggestionsText;
