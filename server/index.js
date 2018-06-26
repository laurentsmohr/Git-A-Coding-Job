var searchGithub = require('./lib/searchGithub.js');
var express = require('express');
var bodyParser = require('body-parser');
var db = require('./database/index');

var app = express();
app.use(bodyParser.json())
app.use(express.static(__dirname + '/../client/dist'));

// KEEPS THE CONNECTION ALIVE
setInterval(function () {
  db.query('SELECT 1');
}, 5000);

app.post('/search', function (req, res) {
  console.log('post received', req.body);
  searchGithub(req.body, (err, data) => {
    if(err) res.status(400).send(err);
    else res.status(201).send(data);
  })
});

app.post('/loginUser', function(req, res) {
  console.log(req.body.username);
  let queryStr = `SELECT * FROM users WHERE name='${req.body.username}'`;
  db.query(queryStr, function(err, result) {
    if (err) {
      console.error(err);
      res.status(400).send(err);
    } else {
      console.log(result);
      if (result.length === 0) {
        res.send('invalidUsername');
      } else {
        if (result[0].password !== req.body.password) {
          res.send('invalidPassword');
        } else {
          res.status(200).send(result[0]);
        }
      }
    }
  })
});

app.post('/signupUser', function(req, res) {
  let queryStr = 'SELECT * FROM users WHERE name=(?)';
  db.query(queryStr, [req.body.username], function(err, result) {
    if (err) {
      console.error(err);
      res.status(400).send(err);
    } else {
      if(result.length === 0) {
        let queryStr = 'INSERT INTO users (name, password) VALUES (?, ?)';
        db.query(queryStr, [req.body.username, req.body.password], function(err, result) {
          if(err) {
            console.error(err);
            res.status(400).send(err);
          } else {
            console.log('saved', result);
            res.status(200).send(result);
          }
        });
      } else {
        res.send('usernameTaken');
      }
    }
  })
});

app.post('/save', function(req, res) {
  console.log('save request received');

  // SAVING JOB
  let job = req.body.job;
  let queryStr1 = 'INSERT IGNORE INTO saved_jobs (id, title, company, location, type, description) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(queryStr1, [job.id, job.title, job.company, job.location, job.type, job.description], function(err, result) {
    if(err) {
      console.error(err);
      res.status(400).send(err);
    } else {
      // SAVING USERID AND JOBID IN JOINT TABLE
      let userId = req.body.user
      let queryStr2 = 'INSERT INTO users_savedjobs (user_id, saved_jobs_id) VALUES (?, ?)'; 
      db.query(queryStr2, [userId, job.id], function (err, saved) {
        if(err) {
          console.error(err);
          res.status(400).send(err);
        } else {
          console.log('saved ', saved);
          res.status(200).send(`Saved Job ${job.title}, to ${userId}`)
        }
      })
    }
  })
});

app.get('/:userId/savedJobs', function(req, res) {
  let queryStr ='SELECT * FROM saved_jobs INNER JOIN users_savedjobs ON saved_jobs.id = users_savedjobs.saved_jobs_id WHERE saved_jobs.id IN (SELECT saved_jobs_id FROM users_savedjobs WHERE user_id=(?))'
  db.query(queryStr, [req.params.userId], function(err, result) {
    if (err) {
      console.error(err);
      res.status(400).send(err);
    } else {
      console.log(result);
      res.status(200).send(result)
    }
  }) 

})

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}!`);
});