var mysql = require('mysql');
var config = require('../config.js')

console.log(config);
var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: config.pw,
  database: 'git_jobs',
  insecureAuth : true
});

connection.connect(err => {
  if (err) {
    console.log('Error connecting to gitjobs: ', err);
  } else {
      console.log('Connected to gitjobs!');
  }
});

module.exports = connection;

