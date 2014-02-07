# Recon AR Drone plugin

Recon is a camera plugin for the [ardrone-webflight](https://github.com/eschnou/ardrone-webflight) library.

## Installing

Install ardrone-webflight (see the [ardrone-webflight](https://github.com/eschnou/ardrone-webflight) repo for full instructions)

    git clone git://github.com/eschnou/ardrone-webflight.git
    cd ardrone-webflight
    npm install
    bower install

Install the webflight-recon plugin

    cd plugins
    git clone git@github.com:yaworsw/webflight-recon.git recon

Enable the recon plugin by adding `recon` to the plugins array in `config.js`

    ...
    plugins: [
      'video-png',
      'pilot',
      'recon'
    ],
    ...

__Currently Recon depends on the video-png plugin and does not work with the video-stream plugin__

## Usage

While flying your AR Drone press `p` to take a picture.

Pictures are saved in the `<ardrone-webflight>/plugins/recon/images` directory.

## TODO

- ~~Configurable save locations~~
- ~~Timestamped image names~~
- Configurable image types
- ~~Notification of success/error~~
- ~~Documentation on how to install and use might be nice~~
- ~~Choose a better key to bind to~~
- Get working with image stream
- Configurable key bindings
