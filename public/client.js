(function () {

window.tappas = {};

tappas.search = function(query) {
  return new Promise(function(resolve, reject) {
    superagent
      .get('https://www.acast.com/api/search?q='+ query)
      .end(function(err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res.body);
        }
      });
  });
};

tappas.searchAudio = function(query) {
  return new Promise(function(resolve, reject) {
    superagent
      .get('/search?q='+ query)
      .end(function(err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res.body);
        }
      });
  });
};

tappas.getTranscript = function(episodeId, audioId) {
  // /api/items/:item_id/audio_files/:audio_file_id/content_json
  // /api/items/:item_id/audio_files/:audio_file_id/transcript

  return new Promise(function(resolve, reject) {
    superagent
      .get('/transcript/'+ episodeId +'/'+ audioId)
      .then(function(err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res.body);
        }
      });
  });
}

}());