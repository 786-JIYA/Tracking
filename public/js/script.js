// // const socket = io();
// // if (navigator.geolocation) {
// //     navigator.geolocation.getCurrentPosition((position) => {
// //         const { latitude, longitude } = position.coords;
// //         // const latitude = 16.6895141;
// //         // const longitude = 74.2531461;

// //         socket.emit("send-location", {
// //             latitude, longitude
// //         });
// //     }, (error) => {
// //         console.error(error);
// //     }, {
// //         enableHighAccuracy: true,
// //         timeout: 5000,
// //         maximumAge: 0
// //     });
// // }


// // const map = L.map("map").setView([0, 0], 10);
// // L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
// //     attribution: "Jiya"
// // }).addTo(map);

// // const markers = {};

// // socket.on("receive-location", (data) => {
// //     const { id, latitude, longitude } = data;
// //     map.setView([latitude, longitude], 16);
// //     if (markers[id]) {
// //         markers[id].setLatLng([latitude, longitude]);
// //     } else {
// //         markers[id] = L.marker([latitude, longitude]).addTo(map);
// //     }
// // });

// // socket.on("user-disconnect", (id) => {
// //     if (markers[id]) {
// //         map.removeLayer(markers[id]);
// //         delete markers[id];
// //     }
// // })

// const socket = io();

// // Get current location and emit it
// if (navigator.geolocation) {
//     navigator.geolocation.watchPosition((position) => {
//         const { latitude, longitude } = position.coords;

//         socket.emit("send-location", {
//             lat: latitude,
//             lng: longitude
//         });
//     }, (error) => {
//         console.error(error);
//     }, {
//         enableHighAccuracy: true,
//         timeout: 5000,
//         maximumAge: 0
//     });
// }

// // Initialize Leaflet map
// const map = L.map("map").setView([0, 0], 10);
// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//     attribution: "Jiya"
// }).addTo(map);

// // Store markers per user
// const markers = {};

// // Handle incoming location from server
// socket.on("receive-location", (data) => {
//     const { id, lat, lng } = data;
//     map.setView([lat, lng], 16);

//     if (markers[id]) {
//         markers[id].setLatLng([lat, lng]);
//     } else {
//         markers[id] = L.marker([lat, lng]).addTo(map);
//     }
// });

// // Handle disconnection of users
// socket.on("user-disconnected", (id) => {
//     if (markers[id]) {
//         map.removeLayer(markers[id]);
//         delete markers[id];
//     }
// });


// const socket = io();

// // Initialize map at a default view
// const map = L.map("map").setView([16.8549, 74.5644], 15); // You can center around your college

// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//     attribution: "Map data © OpenStreetMap contributors"
// }).addTo(map);

// // Store marker for the bus/device
// let busMarker = null;

// socket.on("receive-location", (data) => {
//     const { lat, lng } = data;

//     // Move map to new position
//     map.setView([lat, lng], 16);

//     // Update or create marker
//     if (busMarker) {
//         busMarker.setLatLng([lat, lng]);
//     } else {
//         busMarker = L.marker([lat, lng]).addTo(map).bindPopup("📍 College Bus");
//     }
// });

// const socket = io();

// // Initialize map at your desired default view
// const map = L.map("map").setView([16.8549, 74.5644], 15);

// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//     attribution: "Map data © OpenStreetMap contributors"
// }).addTo(map);

// // Store markers by socket ID
// const markers = {};

// socket.on("receive-location", (data) => {
//     const { id, lat, lng, time, speed } = data;

//     // Check if marker exists
//     if (markers[id]) {
//         markers[id].setLatLng([lat, lng])
//             .setPopupContent(`📍 College Bus<br>🕒 ${time}<br>🚀 ${speed} km/h`);
//     } else {
//         // Create new marker
//         markers[id] = L.marker([lat, lng])
//             .addTo(map)
//             .bindPopup(`📍 College Bus<br>🕒 ${time}<br>🚀 ${speed} km/h`)
//             .openPopup();
//     }

//     // Optional: center the map
//     map.setView([lat, lng], 16);
// });

// // Remove marker when client disconnects
// socket.on("user-disconnected", (id) => {
//     if (markers[id]) {
//         map.removeLayer(markers[id]);
//         delete markers[id];
//     }
// });

const socket = io();

// Initialize map with a default view
const map = L.map("map").setView([0, 0], 15);



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


