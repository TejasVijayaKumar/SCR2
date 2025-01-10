import openrouteservice

# Replace with your API key
client = openrouteservice.Client(key='5b3ce3597851110001cf6248227b2cc2027f404090c703cb68144c6e')

# Example of getting directions (for routing)
coords = ((8.34234, 48.23424), (8.34423, 48.26424))
routes = client.directions(coordinates=coords, profile='driving-car', format='geojson')

# Print the response
print(routes)

# Save the GeoJSON result to a file
with open("route.geojson", "w") as f:
    import json
    json.dump(routes, f)
