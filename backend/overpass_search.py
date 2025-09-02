# overpass_search.py
"""
Search for places using OpenStreetMap's Overpass API.
"""
import requests

def search_places_osm(query, lat, lon, radius=3000, max_results=5):
    # Overpass QL: search for nodes/ways/relations with name or amenity matching query
    overpass_url = "https://overpass-api.de/api/interpreter"
    # Example: find community gardens near Berlin
    # Query can be an OSM tag (e.g. 'recycling', 'community_garden', 'bicycle_repair_station') or a name
    q = f'''
    [out:json][timeout:25];
    (
      node["name"~"{query}"](around:{radius},{lat},{lon});
      node["amenity"~"{query}"](around:{radius},{lat},{lon});
      node["leisure"~"{query}"](around:{radius},{lat},{lon});
      node["shop"~"{query}"](around:{radius},{lat},{lon});
      node["craft"~"{query}"](around:{radius},{lat},{lon});
    );
    out center {max_results};
    '''
    response = requests.post(overpass_url, data={'data': q}, timeout=30)
    response.raise_for_status()
    data = response.json()
    results = []
    for el in data.get('elements', [])[:max_results]:
        name = el['tags'].get('name', '(no name)')
        typ = el['tags'].get('amenity') or el['tags'].get('leisure') or el['tags'].get('shop') or el['tags'].get('craft')
        lat = el.get('lat')
        lon = el.get('lon')
        results.append({
            'name': name,
            'type': typ,
            'lat': lat,
            'lon': lon,
            'osm_url': f"https://www.openstreetmap.org/node/{el['id']}"
        })
    return results

# Example usage:
# places = search_places_osm('community garden', 52.5200, 13.4050)
# for p in places:
#     print(p)
