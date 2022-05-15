var users = [[]];

// add user
function join(id) {
  for (var i = 0; i < users.length; i++) {
    if (users[i].length < 2) {
      users[i].push(id);
      users.push([]);
      return users[i][0];
    }
  }
}

// get current user
function current(id) {
  for (var i = 0; i < users.length; i++) {
    if (users[i].includes(id)) {
      return users[i][0];
    }
  }
}

//user leaves chat
function leave(id) {
  for (var i = 0; i < users.length; i++) {
    if (users[i].includes(id)) {
      return users[i].splice(users[i].indexOf(id), 1);
    }
  }
}

module.exports = { join, current, users, leave };
