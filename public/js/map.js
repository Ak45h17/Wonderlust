mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: coordinates, // Dynamically from EJS
  zoom: 10
});






  // Create a marker
const marker = new mapboxgl.Marker({ color: '#FF385C' }) // Airbnb style color
  .setLngLat(coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }) // Optional offset for better position
      .setHTML(`<h6>📍 Exact location</h6><p>Will be provided after booking</p>`)
  )
  .addTo(map);

// Automatically open the popup
marker.togglePopup();
