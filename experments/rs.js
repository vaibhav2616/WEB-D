const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';

document.getElementById('generate-plan-btn').addEventListener('click', generatePlan);

function generatePlan() {
    const startLocation = document.getElementById('start-location').value.trim();
    const gender = document.getElementById('gender').value;
    const travelDays = parseInt(document.getElementById('travel-days').value);
    const hotelPreference = document.getElementById('hotel-preference').value;
    const restaurantPreference = document.getElementById('restaurant-preference').value;
    const suggestions = document.getElementById('suggestions').value.trim();

    if (!startLocation) {
        alert("Please provide a starting point.");
        return;
    }

    axios
        .get(`https://maps.googleapis.com/maps/api/geocode/json`, {
            params: { address: startLocation, key: apiKey },
        })
        .then((response) => {
            const location = response.data.results[0].geometry.location;
            findNearbyPlaces(location.lat, location.lng, gender, travelDays, hotelPreference, restaurantPreference, suggestions);
        })
        .catch((error) => {
            console.error('Geocoding API error:', error.response ? error.response.data : error.message);
            alert("Error fetching start location details. Please check the location and try again.");
        });
}

function findNearbyPlaces(lat, lng, gender, travelDays, hotelPreference, restaurantPreference, suggestions) {
    const radius = 10000; // 10 km radius
    axios
        .get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
            params: {
                location: `${lat},${lng}`,
                radius,
                keyword: 'tourist attractions',
                key: apiKey,
            },
        })
        .then((response) => {
            const attractions = response.data.results;
            generateDetailedPlan(attractions, gender, travelDays, hotelPreference, restaurantPreference, suggestions);
        })
        .catch((error) => {
            console.error('Places API error:', error.response ? error.response.data : error.message);
            alert("Error fetching nearby places. Try again later.");
        });
}

function generateDetailedPlan(attractions, gender, travelDays, hotelPreference, restaurantPreference, suggestions) {
    const planOutput = document.getElementById('plan-output');
    planOutput.innerHTML = '<h3>Recommended Itinerary</h3>';

    if (!attractions.length) {
        planOutput.innerHTML = '<p>No places found in the vicinity.</p>';
        return;
    }

    const itinerary = attractions.slice(0, 5).map((place, index) => `
        <div>
            <h4>${index + 1}. ${place.name}</h4>
            <p>${place.vicinity}</p>
            <p>Rating: ${place.rating || 'N/A'}</p>
            <p>Travel Tip: ${gender === 'female' ? 'Prefer well-lit areas during late hours.' : ''}</p>
        </div>
    `).join('');

    planOutput.innerHTML = `
        <p><strong>Days to Travel:</strong> ${travelDays}</p>
        <p><strong>Hotel Preference:</strong> ${hotelPreference}</p>
        <p><strong>Restaurant Preference:</strong> ${restaurantPreference}</p>
        <p><strong>Suggestions Provided:</strong> ${suggestions || 'None'}</p>
        ${itinerary}
    `;
}
