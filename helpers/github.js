const request = require('request');
// const config = require('../config.js');


let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  console.log(username, 'whats this?')
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${process.env.GITHUB_TOKEN}`
    }
  };

  request.get(options, function(error, github) {
    if (error) {
      console.log(error);
    } else {
      callback(github);
    }
  });
}

module.exports.getReposByUsername = getReposByUsername;

 