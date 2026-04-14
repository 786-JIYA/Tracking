// const socket = io();

// // Initialize map with a default view
// //const map = L.map("map").setView([0, 0], 15);


// //Bismillah HirRhman Nir -Raheem

// // --- STATIC STOP MARKER ---


// // const stop = {
// //     name: "Market Yard (Stop 3)",
// //     lat: 16.8511318,
// //     lng:74.5727574
    
// // };

// const stops = {
//   "market-yard": { name: "Market Yard", lat: 16.8511318, lng: 74.5727574 },
//   "railway-station": { name: "Railway Station", lat: 16.8420, lng: 74.5600 },
//   "bus-stand": { name: "Bus Stand", lat: 16.8400, lng: 74.5800 }
// };



// // L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
// //     attribution: "Map data © OpenStreetMap contributors"
// // }).addTo(map);


// //Bismillah Hir-Rahman -Nir-Raheem
// const stop = window.stopData;

// // IMPORTANT: set view first
// const map = L.map("map").setView([stop.lat, stop.lng], 15);

// // THEN add tile layer immediately
// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//     attribution: "© OpenStreetMap contributors"
// }).addTo(map);

// const stopMarker = L.marker([stop.lat, stop.lng])
//     .addTo(map)
//     .bindTooltip(`📍 ${stop.name}`, {
//         permanent: true,
//         direction: "top"
//     });



// // Just one marker for the bus
// const busMarker = {};

// socket.on("receive-location", (data) => {
//     console.log("Recaived Location", data);
//     const { id, lat, lng, time, speed } = data;

//     //Bismillah Hir-Rahman NirRheem
//     const distance = map.distance(
//     [lat, lng],
//     [stop.lat, stop.lng]
// ); // distance in meters

// let eta = "Calculating...";

// if (speed > 0) {
//     const speed_mps = speed * (1000 / 3600); // convert km/h → m/s

//     const timeSeconds = distance / speed_mps;

//     const minutes = Math.floor(timeSeconds / 60);
//     const seconds = Math.floor(timeSeconds % 60);

//     eta = `${minutes} min ${seconds} sec`;
// } else {
//     eta = "Bus stopped";
// }

//     // Update map center
//     // map.setView([lat, lng], 16);
 

//     // Update or create marker
//     if (busMarker[id]) {
//         busMarker[id].setLatLng([lat, lng])
//             .setPopupContent(`🚌 College Bus<br>
// ⏱ ${time}<br>
// 🚀 ${speed} km/h<br>
// 📍 ETA: ${eta}`);

//     } else {
//         busMarker[id] = L.marker([lat, lng])
//             .addTo(map)
//             .bindPopup(`🚌 College Bus<br>
// ⏱ ${time}<br>
// 🚀 ${speed} km/h<br>
// 📍 ETA: ${eta}`)
//             .openPopup();
//     }

//     const bounds = L.latLngBounds([
//         [stop.lat, stop.lng],
//         [lat, lng]
//     ]);

//     map.fitBounds(bounds, { padding: [50, 50] });
// });


const socket = io();

// ------------------------------
// GET STOP FROM BACKEND (EJS)
// ------------------------------
const stop = window.stopData;

// ------------------------------
// INIT MAP
// ------------------------------
const map = L.map("map").setView([stop.lat, stop.lng], 15);

// Tile layer (BASE MAP)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
}).addTo(map);

// ------------------------------
// STOP MARKER (STATIC)
// ------------------------------
const stopMarker = L.marker([stop.lat, stop.lng])
    .addTo(map)
    .bindTooltip(`📍 ${stop.name}`, {
        permanent: true,
        direction: "top"
    });

// ------------------------------
// LIVE BUS MARKER
// ------------------------------
let busMarker = null;
let firstUpdate = true;

// ------------------------------
// SOCKET: LIVE LOCATION
// ------------------------------
socket.on("receive-location", (data) => {
    console.log("Received Location:", data);

    const { id, lat, lng, time, speed } = data;

    // ------------------------------
    // DISTANCE CALCULATION
    // ------------------------------
    const distance = map.distance(
        [lat, lng],
        [stop.lat, stop.lng]
    );

    // ------------------------------
    // ETA CALCULATION
    // ------------------------------
    let eta = "Calculating...";

    if (speed > 0) {
        const speed_mps = speed * (1000 / 3600);
        const timeSeconds = distance / speed_mps;

        const minutes = Math.floor(timeSeconds / 60);
        const seconds = Math.floor(timeSeconds % 60);

        eta = `${minutes} min ${seconds} sec`;
    } else {
        eta = "Bus stopped";
    }

    // ------------------------------
    // CREATE / UPDATE BUS MARKER
    // ------------------------------
    if (!busMarker) {
        busMarker = L.marker([lat, lng])
            .addTo(map)
            .bindPopup("🚌 Live Bus")
            .openPopup();
    } else {
        busMarker.setLatLng([lat, lng]);
        busMarker.setPopupContent(`
            🚌 College Bus<br>
            ⏱ ${time}<br>
            🚀 ${speed} km/h<br>
            📍 Distance: ${Math.floor(distance)} m<br>
            ⏳ ETA: ${eta}
        `);
    }

    // ------------------------------
    // FIT MAP (ONLY FIRST TIME)
    // ------------------------------
    if (firstUpdate) {
        map.fitBounds([
            [stop.lat, stop.lng],
            [lat, lng]
        ], { padding: [50, 50] });

        firstUpdate = false;
    }
});









