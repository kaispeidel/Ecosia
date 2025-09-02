# llm_keyword_extractor.py
import re

# English stopwords that won't be useful for location search
STOPWORDS = set([
    "a", "an", "the", "and", "but", "or", "for", "nor", "on", "at", "to", "by", "is", "are", 
    "was", "were", "be", "been", "being", "have", "has", "had", "do", "does", "did", "can", 
    "will", "would", "should", "could", "this", "that", "these", "those", "i", "you", "he", 
    "she", "it", "we", "they", "their", "your", "our", "my", "its", "of", "with", "as", "in",
    "such", "from", "only", "not", "no", "also", "overall", "associated", "service", "provide",
    "promotes", "users", "helps", "allows", "involves", "following", "features", "them", "user",
    "enables", "one", "many", "much", "some", "during", "while", "when", "each", "every",
    "all", "any", "other", "another", "most", "more", "less", "few", "several", "who", "what",
    "where", "when", "why", "how"
])

# Words that indicate something might be a place or searchable concept
PLACE_INDICATORS = set([
    "garden", "park", "shop", "store", "market", "cafe", "restaurant", "farm", "center", "centre",
    "community", "local", "organic", "sustainable", "eco", "green", "reuse", "recycle", "camping",
    "hiking", "tour", "trip", "rental", "rent", "buy", "purchase", "join", "participate", "clean",
    "volunteer", "subscription", "box", "product", "gear", "food", "snack", "workshop", "class", 
    "event", "festival", "meeting", "solar", "kayak", "trace", "leave", "stove", "camp"
])

def extract_keywords_llm(suggestion, api_key=None, location="Berlin, Germany"):
    """Extract short, search-friendly keywords from a suggestion."""
    # Clean the suggestion text
    text = suggestion.lower()
    
    # Keywords that map suggestions to actual places people might search for
    action_to_place = {
        "camping": "camping gear shop, outdoor store",
        "hiking": "hiking gear, outdoor store, sports shop",
        "kayaking": "kayak rental, kayaking tour",
        "clean-up": "volunteer organization, environmental group",
        "volunteer": "volunteer organization, community center",
        "solar": "solar equipment store, outdoor store, camping gear",
        "eco-friendly": "eco store, sustainable shop, organic market",
        "organic": "organic market, health food store",
        "sustainable": "sustainable store, eco shop, green market",
        "subscription box": "organic store, grocery delivery",
        "rental": "rental service, outdoor gear shop",
        "leave no trace": "hiking club, outdoor education center",
        "garden": "community garden, garden center",
        "natural ingredients": "organic store, health food shop",
        "snacks": "organic market, health food store",
        "tour": "tour operator, travel agency"
    }
    
    # Find matching keywords for the suggestion
    for keyword, place_types in action_to_place.items():
        if keyword in text:
            return place_types
    
    # Fallback to basic place type extraction
    place_types = []
    
    # Look for specific common phrases
    common_places = [
        "camping gear", "outdoor store", "community garden", "national park",
        "eco store", "organic market", "kayak rental", "bike shop", 
        "farmers market", "sustainable shop", "green market", "outdoor shop"
    ]
    
    for phrase in common_places:
        if any(word in text for word in phrase.split()):
            place_types.append(phrase)
            if len(place_types) >= 2:
                break
    
    # Final fallback
    if not place_types:
        return "eco store, organic market"
        
    return ', '.join(place_types)

# Example usage:
# print(extract_keywords_llm("Join a local community garden to grow your own food and meet neighbors."))
