var fs        = require('fs'),
    express   = require('express'),
    path      = require('path'),
    badEncode = require('./badEncode');

var outDir  = __dirname + '/images';

var getFileName = function() {
  var pathArray = outDir.split('/');
  if (pathArray[0] !== '/') {
    pathArray.unshift('/');
  }
  pathArray.push(+new Date + '.png');
  return path.join.apply(path, pathArray);
};

module.exports = function(name, deps) {

  if (deps.config.recon) {
    outDir = deps.config.recon.outDir || outDir;
  }

  deps.app.post('/recon', express.bodyParser({ limit: '50mb' }), function(req, res) {
    var image = req.body.image;
    if (badEncode === image) {
      res.json(500, {
        message: 'Image matched encode error'
      });
      res.end();
    } else {
      var fileName = getFileName(),
          data = image.replace(/^data:image\/png;base64,/, '');
      fs.writeFile(fileName, data, 'base64', function(err) {
        if (err) {
          res.json(500, err);
        } else {
          res.json(200, { fileName: fileName });
        }
        res.end();
      });
    }
  });

};
