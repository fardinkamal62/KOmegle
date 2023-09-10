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

const joinedRooms = new Set();

io.on('connection', (socket) => {
    let id;
    socket.on('join', (roomID) => {
        id = roomID || socket.id;

        socket.join(id);

        if (!joinedRooms.has(socket.id)) {
            socket.broadcast.to(id).emit('server', 'Someone Joined the Chat');
            joinedRooms.add(socket.id);
        }
        io.to(socket.id).emit('roomID', {room: id, user: socket.id});
    });

    // Listen for messages from the client
    socket.on('sendMessage', (message) => {
        io.in(id).emit('message', message);
    });

    // Disconnect listener
    socket.on('disconnect', () => {
        io.in(id).emit('server', 'Someone Left the Chat');
    });
});

server.listen(8000, () => {
    console.log('Listening on port 8000');
});
