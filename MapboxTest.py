import requests


def get_country_from_coordinates(latitude, longitude):
    url = f"https://api.mapbox.com/geocoding/v5/mapbox.places/{longitude},{latitude}.json"
    params = {
        "access_token": "pk.eyJ1IjoiZ28taWZyYyIsImEiOiJja3E2bGdvb3QwaXM5MnZtbXN2eGtmaWgwIn0.llipq3Spc_PPA2bLjPwIPQ",
        "types": "country"
    }

    response = requests.get(url, params=params)
    data = response.json()

    # Extract the country from the response
    if "features" in data and len(data["features"]) > 0:
        country = data["features"][0]["text"]
        return country

    return None


# Example usage
latitude = 0.08637
longitude = 120.050538


country = get_country_from_coordinates(latitude, longitude)
if country:
    print(f"The country at ({latitude}, {longitude}) is: {country}")
else:
    print("No country found for the given coordinates.")
