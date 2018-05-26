var mysql = require('mysql');

var connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'gitjobs'
});

connection.connect(err => {
  if (err) {
    console.log('Error connecting to gitjobs: ', err);
  } else {
      console.log('Connected to gitjobs!');
  }
});

module.exports = connection;

