# test_google_places.py
import os
import requests
from dotenv import load_dotenv

def geocode_location(location_name):
    url = get_geocode_url()
    params = {"address": location_name, "key": os.getenv("GOOGLE_MAPS_API_KEY")}
    resp = requests.get(url, params=params, timeout=15)
    resp.raise_for_status()
    data = resp.json()
    if not data["results"]:
        raise ValueError(f"Location not found: {location_name}")
    loc = data["results"][0]["geometry"]["location"]
    return loc["lat"], loc["lng"]

def search_places_google(query, lat, lng, radius=3000, max_results=5):
    url = get_nearbysearch_url()
    params = {
        "key": os.getenv("GOOGLE_MAPS_API_KEY"),
        "location": f"{lat},{lng}",
        "radius": radius,
        "keyword": query
    }
    resp = requests.get(url, params=params, timeout=15)
    resp.raise_for_status()
    data = resp.json()
    results = []
    for place in data.get("results", [])[:max_results]:
        results.append({
            "name": place.get("name"),
            "address": place.get("vicinity"),
            "place_id": place.get("place_id"),
            "maps_url": f"https://www.google.com/maps/place/?q=place_id:{place.get('place_id')}"
        })
    return results

def get_geocode_url():
    return os.getenv("GEOCODE_API_URL", "https://maps.googleapis.com/maps/api/geocode/json")

def get_nearbysearch_url():
    return os.getenv("NEARBYSEARCH_API_URL", "https://maps.googleapis.com/maps/api/place/nearbysearch/json")

if __name__ == "__main__":
    load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env'))
    location = "Berlin, Germany"
    query = "community garden"
    lat, lng = geocode_location(location)
    print(f"Searching for '{query}' near {location} ({lat}, {lng})...")
    places = search_places_google(query, lat, lng)
    for p in places:
        print(f"- {p['name']} @ {p['address']} - {p['maps_url']}")

    # Save results to file
    output_path = "backend/ai_suggestions/places_google_berlin.txt"
    with open(output_path, 'w', encoding='utf-8') as f:
        for p in places:
            f.write(f"{p['name']} @ {p['address']} - {p['maps_url']}\n")
    print(f"Results saved to {output_path}")
