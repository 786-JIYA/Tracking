
// // const express = require('express');
// // const app = express();
// // const http = require('http');
// // const socketio = require('socket.io');
// // const path = require("path");
// // const server = http.createServer(app);
// // const cors = require('cors');
// // // This allows cross-origin requests


// // const io = socketio(server);

// // // Set up the view engine and static folder for serving front-end assets
// // app.set("view engine", "ejs");
// // app.use(express.static(path.join(__dirname, "public")));

// // app.use(cors());
// // app.use(express.json()); // middleware to parse JSON

// // app.post("/location", function (req, res) {
// //     const { lat, lng } = req.body;
// //     console.log("📥 GPS data received via POST:", lat, lng);

// //     // Optionally emit to socket
// //     io.emit("receive-location", {
// //         id: "esp8266",
// //         lat,
// //         lng,
// //         time: new Date().toLocaleTimeString(),
// //         speed: 0 // You can calculate real speed if needed
// //     });

// //     res.sendStatus(200);
// // });


// // io.on("connection", function (socket) {
// //     console.log("Client connected:", socket.id);



// //     socket.on("send-location", (data) => {
// //         console.log("Received location:", data);
// //         console.log("sending..", {
// //             id: socket.id,
// //             lat: data.latitude,
// //             lng: data.longitude,
// //             time: new Date().toLocaleTimeString(), // example time
// //             speed: data.speed || 0 // ex
// //         })
// //         // Adding additional data (time, speed, etc.)
// //         io.emit("receive-location", {
// //             id: socket.id,
// //             lat: data.lat,
// //             lng: data.lng,
// //             time: new Date().toLocaleTimeString(), // example time
// //             speed: data.speed || 0 // example speed, add logic to calculate if necessary
// //         });
// //     });



// //     socket.on('disconnect', () => {
// //         console.log('Client disconnected:', socket.id);
// //         // Notify all connected clients that a user has disconnected
// //         io.emit('user-disconnected', socket.id);
// //     });
// // });

// // // Route to render the map page
// // app.get("/", function (req, res) {
// //     res.render("index.ejs");
// // });


// // // Start the server
// // server.listen(3000, () => {
// //     console.log("Server is running on http://localhost:3000");
// // });

// const express = require('express');
// const app = express();
// app.set("io", null);
// const cors = require('cors');
// const path = require("path");

// app.use(cors());
// app.use(express.json());

// app.set("view engine", "ejs");
// app.use(express.static(path.join(__dirname, "public")));



// app.post("/location", (req, res) => {
//     const { lat, lng } = req.body;

//     console.log("📥 GPS data received:", lat, lng);

//     const io = req.app.get("io");
//     if (io) {
//         io.emit("receive-location", {
//             id: "esp8266",
//             lat: Number(lat),
//             lng: Number(lng),
//             time: new Date().toLocaleTimeString(),
//             speed: 0
//         });
//     }

//     res.sendStatus(200);
// });

// app.get("/:stop", (req, res) => {

//     const stops = {
//         "market-yard": { name: "Market Yard", lat: 16.8511318, lng: 74.5727574 },
//         "railway-station": { name: "Railway Station", lat: 16.84, lng: 74.56 }
//     };

//     const stop = stops[req.params.stop];

//     if (!stop) return res.send("Stop not found");

//     res.render("index", { stop });
// });

// //Bismillah HirRahmen Nir Raheem 
// // app.post("/location", (req, res) => {
// //     const { lat, lng } = req.body;

// //     console.log("📥 GPS data received:", lat, lng);

// //     const io = req.app.get("io");

// //     console.log("IO OBJECT:", io); // 🔥 DEBUG

// //     if (io) {
// //         console.log("📡 Emitting to frontend...");

// //         io.emit("receive-location", {
// //             id: "esp8266",
// //             lat: Number(lat),
// //             lng: Number(lng),
// //             time: new Date().toLocaleTimeString(),
// //             speed: 0
// //         });
// //     } else {
// //         console.log("❌ IO is NULL");
// //     }

// //     res.sendStatus(200);
// // });


// app.get("/", (req, res) => {
//     res.render("index.ejs");
// });

// module.exports = app;

//Bismillah Hir-Rahman Nir-Raheem

const express = require("express");
const app = express();

const path = require("path");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));


// -------------------------
// STOP DATA (central source)
// -------------------------
const stops = {
    "market-yard": {
        name: "Market Yard",
        lat: 16.8511318,
        lng: 74.5727574
    },
    "railway-station": {
        name: "Railway Station",
        lat: 16.8420,
        lng: 74.5600
    },
    "bus-stand": {
        name: "Bus Stand",
        lat: 16.8400,
        lng: 74.5800
    }
};


// -------------------------
// ROUTES
// -------------------------

// Home route
app.get("/", (req, res) => {
    res.render("index", {
        stop: {
            name: "Default Stop",
            lat: 16.85,
            lng: 74.57
        }
    });
});


// Dynamic stop route
app.get("/:stop", (req, res) => {
    const stop = stops[req.params.stop];

    if (!stop) {
        return res.status(404).send("Stop not found");
    }

    res.render("index", { stop });
});


// -------------------------
// GPS POST ROUTE
// -------------------------
app.post("/location", (req, res) => {
    const { lat, lng } = req.body;

    console.log("📥 GPS data received:", lat, lng);

    const io = req.app.get("io");

    if (io) {
        io.emit("receive-location", {
            id: "esp8266",
            lat: Number(lat),
            lng: Number(lng),
            time: new Date().toLocaleTimeString(),
            speed: 0
        });
    }

    res.sendStatus(200);
});


// export app for server.js
module.exports = app;
