(function() {

  var cameraKeyCode = 82,
      cameraUrl     = '/camera',
      canvas        = undefined;

  var successHandler = function(result) {

  };

  var errorHandler = function(result) {

  };

  var Recon = function(cockpit) {
    console.log("Loading Recon plugin.");

    this.cockpit = cockpit;
    canvas = $('canvas')[0];
    this.listen();
  };

  Recon.prototype.listen = function() {
    var self = this;
    $(document).keydown(function(ev) {
      self.keyDown(ev);
    });
  };

  Recon.prototype.keyDown = function(e) {
    if (e.keyCode == cameraKeyCode) {
      $.ajax({
        type: 'POST',
        url:  cameraUrl,
        data: { image: canvas.toDataURL() },
        success: successHandler,
        error: errorHandler
      })
    }
  };

  window.Cockpit.plugins.push(Recon);

})();
