const latitude = localStorage.getItem("latitude");
const longitude = localStorage.getItem("longitude");
const dist = 50;

const flightDetails = [];  // Initialize an empty array to store flight details

fetch(`https://api.allorigins.win/raw?url=https://api.adsb.lol/v2/lat/${latitude}/lon/${longitude}/dist/${dist}`, {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
})
.then(response => response.json())
.then(data => {
  if (data && data.ac && Array.isArray(data.ac)) {
    data.ac.forEach(item => {
      if (item.flight && typeof item.flight === 'string' && item.lat && item.lon && item.alt_geom) {
        // Calculate the distance from the given coordinates to the flight's coordinates
        const distance = calculateDistance(latitude, longitude, item.lat, item.lon);
        
        // Store the flight details in a dictionary
        const flightInfo = {
          flightNumber: item.flight.trim(),
          distance: distance.toFixed(2),  // Distance in kilometers (rounded to two decimal places)
          altitude: item.alt_geom,  // Geometric altitude
        };

        flightDetails.push(flightInfo);  // Add the dictionary to the list
      }
    });

    // Sort the flight details by distance (ascending)
    flightDetails.sort((a, b) => a.distance - b.distance);

    // Get the top 3 flights
    const top3Flights = flightDetails.slice(0, 3);

    // Update the HTML with the top 3 flight details
    const topFlightsContainer = document.getElementById('top-flights');
    top3Flights.forEach(flight => {
      const flightCard = document.createElement('div');
      flightCard.classList.add('flight-card');

      const flightNumber = document.createElement('h3');
      flightNumber.textContent = `Flight: ${flight.flightNumber}`;
      flightCard.appendChild(flightNumber);

      const flightDistance = document.createElement('p');
      flightDistance.innerHTML = `<strong>Distance:</strong> ${flight.distance} km`;
      flightCard.appendChild(flightDistance);

      const flightAltitude = document.createElement('p');
      flightAltitude.innerHTML = `<strong>Altitude:</strong> ${flight.altitude} ft`;
      flightCard.appendChild(flightAltitude);

      topFlightsContainer.appendChild(flightCard);
    });
  } else {
    console.log('No valid data available');
  }
})
.catch(error => {
  console.error('Error fetching data:', error);
});

// Helper function to calculate the distance between two coordinates (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;  // Distance in kilometers
}

// Helper function to convert degrees to radians
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}
