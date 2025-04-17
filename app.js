// const express = require('express');
// const app = express();
// const http = require('http');
// const socketio = require('socket.io');
// const path = require("path");
// const server = http.createServer(app);

// const io = socketio(server);

// app.set("view engine", "ejs");
// app.use(express.static(path.join(__dirname, "public")));

// io.on("connection", function (socket) {
//     console.log("Client connected:", socket.id);

//     // const sendFakeGPS = setInterval(() => {
//     //     const fakeLat = 16.8541 + (Math.random() * 0.001); // Around Pune16.8541887
//     //     const fakeLng = 74.5633 + (Math.random() * 0.001);

//     //     io.emit('receive-location', {
//     //         id: 'simulated-esp8266',
//     //         lat: fakeLat,
//     //         lng: fakeLng
//     //     });
//     // }, 3000);

//     /// For Wifi location

//     // socket.on("send-location", function (data) {
//     //     io.emit("receive-location", { id: socket.id, ...data });
//     // });

//     io.on("send-location", function (data) {
//         console.log("Received location:", data);

//         io.emit("receive-location", {
//             id: socket.id,
//             latitude: data.latitude,
//             longitude: data.longitude
//         });
//     });

//     socket.on('disconnect', () => {
//         console.log('Client disconnected:', socket.id);
//         // clearInterval(sendFakeGPS);
//         io.emit('user-disconnected', socket.id);
//     });
// });

// // Route to render the page
// app.get("/", function (req, res) {
//     res.render("index.ejs");
// });

// // Start server
// server.listen(3000, () => {
//     console.log("Server is running on http://localhost:3000");
// });





// // socket.on("send-location", function (data) {
// //     io.emit("receive-location", { id: socket.id, ...data });
// // });

// // socket.on("disconnect", function () {
// //     io.emit("user-disconnected", socket.id);
// // });
// // });



// // app.get("/", function (req, res) {
// //     res.render("index.ejs");
// // })

// // server.listen(3000);



const express = require('express');
const app = express();
const http = require('http');
const socketio = require('socket.io');
const path = require("path");
const server = http.createServer(app);

const io = socketio(server);

// Set up the view engine and static folder for serving front-end assets
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));


app.use(express.json()); // middleware to parse JSON

app.post("/location", function (req, res) {
    const { lat, lng } = req.body;
    console.log("📥 GPS data received via POST:", lat, lng);

    // Optionally emit to socket
    io.emit("receive-location", {
        id: "esp8266",
        lat,
        lng,
        time: new Date().toLocaleTimeString(),
        speed: 0 // You can calculate real speed if needed
    });

    res.sendStatus(200);
});


io.on("connection", function (socket) {
    console.log("Client connected:", socket.id);



    socket.on("send-location", (data) => {
        console.log("Received location:", data);
        console.log("sending..", {
            id: socket.id,
            lat: data.latitude,
            lng: data.longitude,
            time: new Date().toLocaleTimeString(), // example time
            speed: data.speed || 0 // ex
        })
        // Adding additional data (time, speed, etc.)
        io.emit("receive-location", {
            id: socket.id,
            lat: data.lat,
            lng: data.lng,
            time: new Date().toLocaleTimeString(), // example time
            speed: data.speed || 0 // example speed, add logic to calculate if necessary
        });
    });



    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
        // Notify all connected clients that a user has disconnected
        io.emit('user-disconnected', socket.id);
    });
});

// Route to render the map page
app.get("/location", function (req, res) {
    res.render("index.ejs");
});


// Start the server
server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000/location");
});
