var fs      = require('fs');
var express = require('express');

module.exports = function(name, deps) {

  deps.app.post('/recon', express.bodyParser({ limit: '50mb' }), function(req, res) {
    var fileName = 'out.png';
    var data = req.body.image.replace(/^data:image\/png;base64,/, '');
    fs.writeFile(fileName, data, 'base64', function(err) {
      if (err) {
        res.json(500, err);
      } else {
        res.json(200, { fileName: fileName });
      }
      res.end();
    });
  });

};
