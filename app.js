const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
const format = require('./public/messages');
const { join, current, users, leave } = require('./public/users');
const cors = require('cors');
const process = require('process');

const memoryUsage = () => {
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
}
setInterval(() => {
  memoryUsage()
}, 2000)

app.use(express.static('public'));
app.use(cors());

// starting server
io.on('connection', (socket) => {
  // number of users
  let nou = 0;
  let id;
  // on user connection
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
    memoryUsage()
    const idm = current(socket.id);
    io.in(idm).emit('message', format(socket.id, msg));
  });
});

server.listen(8000, () => {
  console.log('Listening on port 8000');
});
