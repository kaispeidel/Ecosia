# test_overpass_search.py
from overpass_search import search_places_osm
import requests

def geocode_location(location_name):
    # Use Nominatim to geocode a location name to lat/lon
    url = "https://nominatim.openstreetmap.org/search"
    params = {"q": location_name, "format": "json", "limit": 1}
    resp = requests.get(url, params=params, headers={"User-Agent": "ecosia-prototype/1.0"}, timeout=15)
    resp.raise_for_status()
    data = resp.json()
    if not data:
        raise ValueError(f"Location not found: {location_name}")
    return float(data[0]["lat"]), float(data[0]["lon"])

if __name__ == "__main__":
    location = "Berlin, Germany"
    query = "community garden"
    lat, lon = geocode_location(location)
    print(f"Searching for '{query}' near {location} ({lat}, {lon})...")
    places = search_places_osm(query, lat, lon)
    # Print results
    for p in places:
        print(f"- {p['name']} ({p['type']}) @ {p['lat']},{p['lon']} - {p['osm_url']}")

    # Save results to file
    output_path = "backend/ai_suggestions/places_berlin.txt"
    with open(output_path, 'w', encoding='utf-8') as f:
        for p in places:
            f.write(f"{p['name']} ({p['type']}) @ {p['lat']},{p['lon']} - {p['osm_url']}\n")
    print(f"Results saved to {output_path}")
