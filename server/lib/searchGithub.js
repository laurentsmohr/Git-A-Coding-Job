var axios = require('axios');

var searchGithub = (params, callback) => {
  axios.get('https://jobs.github.com/positions.json', params)
  .then(response => {
    //console.log(response);
    callback(null, response.data);
  })
  .catch(error => {
    callback(error, null);
  })
};

module.exports = searchGithub;