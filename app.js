const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
const format = require('./public/messages');
const { join, current, users, leave } = require('./public/users');
const cors = require('cors');

app.use(express.static('public'));
app.use(cors());

// number of users
var nou = 0;
var id;
// starting server
// user connected
io.on('connection', (socket) => {
  socket.on('join', () => {
    id = join(socket.id);
    socket.join(id);
    socket.to(id).emit('server', 'Connection established');
    console.log(users);
  });
  // user connects
  nou++;
  console.log(`Number of users ${nou}`);

  // user disconnected
  socket.on('disconnect', () => {
    leave(socket.id);
    console.log(users);
    nou--;
    socket.to(id).emit('server', 'Connection dropped');
    console.log(`Number of users ${nou}`);
  });

  // listen for msg
  socket.on('msg', (msg) => {
    var idm = current(socket.id);
    io.in(idm).emit('message', format('Stranger', msg));
  });
});

server.listen(8000, () => {
  console.log('Listening on port 8000');
});
