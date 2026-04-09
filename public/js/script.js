const socket = io();

// Initialize map with a default view
const map = L.map("map").setView([0, 0], 15);

//Bismillah HirRhman Nir -Raheem

const stop = {
  name: "College Gate",
  lat: 16.7105,
  lng: 74.2500
};

const stopMarker = L.marker([stop.lat, stop.lng])
  .addTo(map)
  .bindPopup("📍 Market Yard");


  
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "Map data © OpenStreetMap contributors"
}).addTo(map);

// Just one marker for the bus
const busMarker = {};

socket.on("receive-location", (data) => {
    console.log("Recaived Location", data);
    const { id, lat, lng, time, speed } = data;

    // Update map center
    map.setView([lat, lng], 16);

    // Update or create marker
    if (busMarker[id]) {
        busMarker[id].setLatLng([lat, lng])
            .setPopupContent(`🚌 College Bus<br>⏱ ${time}<br>🚀 ${speed} km/h`);
        
    } else {
        busMarker[id] = L.marker([lat, lng])
            .addTo(map)
            .bindPopup(`🚌 College Bus<br>⏱ ${time}<br>🚀 ${speed} km/h`)
            .openPopup();
    }
});





socket.on("receive-location", (data) => {
  const { lat, lng } = data;

  // If marker already exists → move it
  if (busMarker) {
    busMarker.setLatLng([lat, lng]);
  } else {
    // First time → create marker
    busMarker = L.marker([lat, lng]).addTo(map);
  }

  // 👉 IMPORTANT: call ETA calculation
  updateETA(lat, lng);
});


