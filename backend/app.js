const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const bodyParser = require('body-parser');
const cookie = require('cookie-parser');
const cors = require('cors');

app.use(cookie());
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors());

const io = socketio(server, {cors: {origin: "*"}});

io.on('connection', (socket) => {
    let id;
    socket.on('join', (roomID) => {
        id = roomID || socket.id;

        socket.join(id);
        io.in(id).emit('server', 'A new member has joined');
        io.in(id).emit('roomID', id);
    });

    // Listen for messages from the client
    socket.on('sendMessage', (message) => {
        io.in(id).emit('message', message);
    });

    // Disconnect listener
    socket.on('disconnect', () => {
        io.in(id).emit('server', 'A member has disconnected');
    });
});

server.listen(8000, () => {
    console.log('Listening on port 8000');
});
