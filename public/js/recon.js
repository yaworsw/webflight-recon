(function() {

  var cameraKeyCode = 82,
      cameraUrl     = '/recon',
      imageElement;

  var getImageData = function(imageElement) {
    var canvas     = document.createElement('canvas'),
        context    = canvas.getContext('2d');
    canvas.height  = 600;
    canvas.width   = 800;
    context.drawImage(imageElement, 0, 0);
    return canvas.toDataURL('image/png');
  };

  var Recon = function(cockpit) {
    console.log("Loading Recon plugin.");

    imageElement = $('#video')[0]

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
      var img   = getImageData(imageElement),
          self  = this;
      $.ajax({
        type: 'POST',
        url:  cameraUrl,
        data: { image: img },
        success: function() {
          self.notify({
            thumbnail: img,
            text:      'Image successfully saved.'
          });
        },
        error: function() {
          self.notify({
            class: 'error',
            text:  'There was an error while trying to save your image.'
          });
        }
      });
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
