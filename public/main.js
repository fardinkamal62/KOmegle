const form = document.getElementById('form');
const chatmsg = document.querySelector('.chat');
const socket = io();

socket.emit('join'); // join room

// message from stranger
socket.on('message', (message) => {
  out(message);
  window.scrollTo(
    0,
    document.body.scrollHeight || document.documentElement.scrollHeight,
  );
});

// server messages
socket.on('server', (message) => {
  console.log(message);
  server(message);
  window.scrollTo(
    0,
    document.body.scrollHeight || document.documentElement.scrollHeight,
  );
});

// message submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const msg = e.target.elements.input.value;

  // emit to server
  socket.emit('msg', msg);

  // clear input
  e.target.elements.input.value = '';
  e.target.elements.input.focus();
});

// server message to dom
function server(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="text" style="color: rgb(171, 171, 171); text-align: center; ">${message}</p>`;
  chatmsg.appendChild(div);
  window.scrollTo(
    0,
    document.body.scrollHeight || document.documentElement.scrollHeight,
  );
}

// output message to dom
function out(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  // div.innerHTML = `<p class="text">${message.time} | ${message.username}: ${message.text}</p>`;
  div.innerHTML = `<p class="text">>  ${message.text}</p>`;
  chatmsg.appendChild(div);
  window.scrollTo(
    0,
    document.body.scrollHeight || document.documentElement.scrollHeight,
  );
}

function time() {
  var d = new Date();
  var n = d.toLocaleString([], { hour: '2-digit', minute: '2-digit' });
  return n;
}
