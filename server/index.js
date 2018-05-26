var searchGithub = require('./lib/searchGithub.js');
var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
// var items = require('../database-mongo');

var app = express();
app.use(bodyParser.json())
app.use(express.static(__dirname + '/../client/dist'));


app.post('/search', function (req, res) {
  console.log('post received', req.body);
  searchGithub(req.body, (err, data) => {
    if(err) res.status(400).send(err);
    else res.status(201).send(data);
  })
});

var port = process.env.PORT || 3000;

app.listen(3000, function() {
  console.log(`listening on port ${port}!`);
});