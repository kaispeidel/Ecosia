import React, { useEffect, useRef, useState } from 'react';

const DEFAULT_CENTER = { lat: 52.52, lng: 13.405 }; // Berlin

const GoogleMapComponent = ({ places = [], height = '400px', selectedPlace }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const infoWindowsRef = useRef([]);
  const placeIdToMarkerRef = useRef({});

  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);

  // Wait for Google Maps script and DOM to be ready, then initialize map
  useEffect(() => {
    let retries = 0;
    const maxRetries = 50;

    const tryInit = () => {
      if (window.google && window.google.maps && mapRef.current) {
        try {
          const map = new window.google.maps.Map(mapRef.current, {
            center: DEFAULT_CENTER,
            zoom: 12,
            mapTypeId: window.google.maps.MapTypeId.ROADMAP
          });
          mapInstanceRef.current = map;
          setReady(true);
          console.info('Google Map initialized');
        } catch (err) {
          console.error('Error creating Google Map', err);
          setError('Failed to initialize Google Map');
        }
      } else {
        retries += 1;
        if (retries < maxRetries) {
          setTimeout(tryInit, 200);
        } else {
          console.error('Google Maps API not available');
          setError('Google Maps API not available');
        }
      }
    };

    tryInit();

    return () => {
      // cleanup markers and infowindows if any
      markersRef.current.forEach(m => m.setMap(null));
      markersRef.current = [];
      infoWindowsRef.current = [];
      placeIdToMarkerRef.current = {};
      mapInstanceRef.current = null;
    };
  }, []);

  // Helper: clear markers
  const clearMarkers = () => {
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
    infoWindowsRef.current = [];
    placeIdToMarkerRef.current = {};
  };

  // Add markers for places (use placeId when available)
  useEffect(() => {
    if (!ready || !window.google || !mapInstanceRef.current) return;

    clearMarkers();

    const map = mapInstanceRef.current;
    const service = new window.google.maps.places.PlacesService(map);

    places.forEach((place) => {
      const placeId = place.placeId;

      const createMarkerFromResult = (result) => {
        if (!result || !result.geometry || !result.geometry.location) return;
        const position = result.geometry.location;
        const marker = new window.google.maps.Marker({
          map,
          position,
          title: place.name || result.name || ''
        });

        const info = new window.google.maps.InfoWindow({
          content: `\n            <div style="padding:8px;font-family:monospace;max-width:260px;">\n              <strong style=\"display:block;margin-bottom:6px;\">${place.name || result.name}</strong>\n              <div style=\"font-size:12px;color:#555;\">${place.category || ''}</div>\n            </div>\n          `
        });

        marker.addListener('click', () => {
          // close other info windows
          infoWindowsRef.current.forEach(iw => iw.close());
          info.open(map, marker);
        });

        markersRef.current.push(marker);
        infoWindowsRef.current.push(info);
        if (placeId) placeIdToMarkerRef.current[placeId] = { marker, info };
      };

      if (placeId) {
        service.getDetails({ placeId, fields: ['geometry', 'name', 'formatted_address'] }, (result, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && result) {
            createMarkerFromResult(result);
          } else {
            console.warn('getDetails failed for', placeId, status);
          }
        });
      } else if (place.name) {
        // fallback: textSearch by name
        service.textSearch({ query: place.name, fields: ['geometry', 'place_id'] }, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && results && results[0]) {
            createMarkerFromResult(results[0]);
          } else {
            console.warn('textSearch failed for', place.name, status);
          }
        });
      }
    });

  }, [ready, places]);

  // Focus when user clicks a place in the list
  useEffect(() => {
    if (!ready || !selectedPlace || !mapInstanceRef.current) return;

    const map = mapInstanceRef.current;

    const focusOnPlace = (place) => {
      if (place.placeId && placeIdToMarkerRef.current[place.placeId]) {
        const { marker, info } = placeIdToMarkerRef.current[place.placeId];
        map.panTo(marker.getPosition());
        map.setZoom(15);
        infoWindowsRef.current.forEach(iw => iw.close());
        info.open(map, marker);
        return;
      }

      // If no marker cached, try to resolve via PlacesService
      const service = new window.google.maps.places.PlacesService(map);
      if (place.placeId) {
        service.getDetails({ placeId: place.placeId, fields: ['geometry', 'name'] }, (result, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && result && result.geometry) {
            map.panTo(result.geometry.location);
            map.setZoom(15);
          }
        });
      } else if (place.name) {
        service.textSearch({ query: place.name }, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && results && results[0] && results[0].geometry) {
            map.panTo(results[0].geometry.location);
            map.setZoom(15);
          }
        });
      }
    };

    focusOnPlace(selectedPlace);
  }, [ready, selectedPlace]);

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 flex items-center justify-center" style={{ height }}>
        <div className="text-red-600 font-mono text-sm">{error}</div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200">
      <div ref={mapRef} style={{ height, width: '100%' }} />
  {/* footer removed per request */}
    </div>
  );
};

export default GoogleMapComponent;
