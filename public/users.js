const users = [];

// add user
function join(id) {
  for (let i in users) {
    if (users[i].length < 2) {
      users[i].push(id);
      return users[i][0];
    }
  }
  users.push([id]);
}

// get current user
function current(id) {
  for (let i in users) {
    if (users[i].includes(id)) {
      return users[i][0];
    }
  }
}

//user leaves chat
function leave(id) {
  for (let i in users) {
    if (users[i].includes(id)) {
      return users[i].splice(users[i].indexOf(id), 1);
    }
  }
}

module.exports = { join, current, users, leave };
