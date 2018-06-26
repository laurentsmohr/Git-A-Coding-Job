var mysql = require('mysql');
var config = require('../config.js')

var connection = mysql.createConnection({
  host: process.env.DATABASE_HOST || config.host,
  user: process.env.DATABASE_USER || config.user,
  password: process.env.DATABASE_PW || config.pw,
  database: process.env.DATABASE_NAME || config.database
});

connection.connect(err => {
  if (err) {
    console.log('Error connecting to git_jobs: ', err);
  } else {
      console.log('Connected to gitjobs!');
  }
});

module.exports = connection;

