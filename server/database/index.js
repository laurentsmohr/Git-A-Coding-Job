var mysql = require('mysql');
//var config = require('../config.js')

var connection = mysql.createConnection({
  host: process.env.DATABASE_HOST || '127.0.0.1',
  user: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PW, //|| config.pw,
  database: process.env.DATABASE_NAME || 'git_jobs'
});

connection.connect(err => {
  if (err) {
    console.log('Error connecting to gitjobs: ', err);
  } else {
      console.log('Connected to gitjobs!');
  }
});

module.exports = connection;

