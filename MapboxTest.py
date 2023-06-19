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

# import requests


# def geocode(address):
#     endpoint = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
#     access_token = 'pk.eyJ1IjoiZ28taWZyYyIsImEiOiJja3E2bGdvb3QwaXM5MnZtbXN2eGtmaWgwIn0.llipq3Spc_PPA2bLjPwIPQ'

#     # Format the address and construct the API request URL
#     formatted_address = address.replace(' ', '%20')
#     url = f"{endpoint}{formatted_address}.json?access_token={access_token}"

#     # Send the API request
#     response = requests.get(url)
#     data = response.json()

#     # Extract the coordinates from the response
#     if 'features' in data and len(data['features']) > 0:
#         location = data['features'][0]['geometry']['coordinates']
#         return location
#     else:
#         return None


# # Example usage
# address = '089210'
# coordinates = geocode(address)

# if coordinates:
#     latitude, longitude = coordinates
#     print(f"Latitude: {latitude}")
#     print(f"Longitude: {longitude}")
# else:
#     print("Location not found.")
