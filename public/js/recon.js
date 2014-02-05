(function() {

  var cameraKeyCode = 82,
      cameraUrl     = '/camera',
      canvas        = undefined;

  var Recon = function(cockpit) {
    console.log("Loading Recon plugin.");

    canvas = $('canvas')[0];

    this.cockpit = cockpit;

    this.initialize();
    this.listen();
  };

  Recon.prototype.initialize = function() {
    $('body').append('<div id="recon-container"><div class="notifications"></div></div>');
    this.container     = $('#recon-container');
    this.notifications = this.container.find('.notifications');
  }

  Recon.prototype.listen = function() {
    var self = this;
    $(document).keydown(function(ev) {
      self.keyDown(ev);
    });
  };

  Recon.prototype.keyDown = function(e) {
    if (e.keyCode == cameraKeyCode) {
      var self  = this;
      var image = canvas.toDataURL();
      $.ajax({
        type: 'POST',
        url:  cameraUrl,
        data: { image: image },
        success: function() {
          self.notify({
            thumbnail: image,
            text:      'Image successfully saved.'
          });
        },
        error: function() {
          self.notify({
            class: 'error',
            text:  'There was an error while trying to save your image.'
          });
        }
      })
    }
  };

  Recon.prototype.notify = function(spec) {
    var notification = $('<div class="notification ' + (spec.class || '') + '" style="display:none"></div>');
    spec.thumbnail && notification.append('<img class="thumbnail" src="' + spec.thumbnail + '"/>');
    spec.text      && notification.append('<span class="text">' + spec.text + '</span>');
    this.notifications.append(notification);
    notification.slideDown();
    setTimeout(function() {
      notification.slideUp('normal', function() {
        $(this).remove();
      });
    }, 1500);
  };

  window.Cockpit.plugins.push(Recon);

})();
