const moment = require('moment');

function format(username, text) {
  return { username, text, time: moment().format('hh:mm A') };
}

module.exports = format;
