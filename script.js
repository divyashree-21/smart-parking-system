const map = L.map("map").setView([12.9716, 77.5946], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap"
}).addTo(map);

// User live location
navigator.geolocation.getCurrentPosition(pos => {
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;

  L.marker([lat, lon])
    .addTo(map)
    .bindPopup("📍 Your Current Location")
    .openPopup();

  map.setView([lat, lon], 15);
});

// Parking slots
const slots = [
  { lat: 12.972, lon: 77.595, status: "FREE" },
  { lat: 12.969, lon: 77.592, status: "OCCUPIED" },
  { lat: 12.968, lon: 77.598, status: "FREE" }
];

slots.forEach(s => {
  L.circleMarker([s.lat, s.lon], {
    radius: 8,
    color: s.status === "FREE" ? "green" : "red"
  })
  .addTo(map)
  .bindPopup(`Slot Status: ${s.status}`);
});
