var Audiosearch = require('./search');
var audiosearch = new Audiosearch(
  '9665a4745b1f1b009278c2e63e0da1d29747688510e25b2291a89e139ffa1f92',
  '15832decb42628d7c4ce668497199a029b553ca2c49f2347b479891c5c6a1377'
);
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/search', function (req, res) {
  var query = req.query.q || '';
  var episodes = audiosearch.searchEpisodes(query);
  var shows = audiosearch.searchShows(query);
  var people = audiosearch.searchPeople(query);

  Promise.all([episodes, shows, people])
    .then(function (results) {
      res.status(200).send({
        episodes: results[0],
        shows: results[1],
        people: results[2],
      });
    })
    .catch(function (error) {
      res.status(500).send(error);
    });
});

app.get('/transcript/:item_id/:audio_id', function (req, res) {
  audiosearch
    .getTranscript(req.params.item_id, req.params.audio_id)
    .then(function(result) {
      res.status(200).send(result);
    })
    .catch(function(error) {
      res.status(500).send(error);
    });
});


app.listen(process.env.PORT || 4100, function () {
  console.log('Server listening on port 4100');
});
