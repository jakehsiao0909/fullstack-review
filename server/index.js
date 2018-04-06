const helpers = require('../helpers/github.js');
const save = require('../database/index.js');
const bodyParser = require('body-parser');
const express = require('express');
let app = express();


app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }));


app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database


  helpers.getReposByUsername(req.body.username, function(github) {
    let repoList = JSON.parse(github.body);
    Promise.all(repoList.map((repo) => save.save(repo)))
    .then (() => res.end(':D'))
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

  save.searchRepo(repos => {
    res.json(repos);
  });

});

let port = process.env.PORT;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

