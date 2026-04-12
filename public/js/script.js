const greenIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const map = L.map("map").setView([12.9716,77.5946],6);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

navigator.geolocation.getCurrentPosition(pos=>{
  L.marker([pos.coords.latitude,pos.coords.longitude])
    .addTo(map).bindPopup("You are here").openPopup();
});

fetch("/api/slots")
.then(res=>res.json())
.then(slots=>{
  slots.forEach(s=>{
    const m = L.marker(
  [s.lat, s.lng],
  { icon: s.available ? greenIcon : redIcon }
).addTo(map);

    m.bindPopup(
      `${s.name}<br>Status: ${s.available?"Available":"Occupied"}<br>` +
      (s.available ? `<button onclick="goToPayment(${s.id},'${s.name}')">Book</button>` : "")
    );
  });
});

function goToPayment(id, name) {
  localStorage.setItem("slotId", id);
  localStorage.setItem("slotName", name);
  window.location.href = "payment.html";
}
