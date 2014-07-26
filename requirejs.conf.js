require.config({
  baseUrl: '.',
  paths: {
    auth: 'bower_components/auth/src',
    base64: 'bower_components/base64/base64',
    'event-emitter': 'bower_components/event-emitter/src/event-emitter',
    inherits: 'bower_components/inherits/inherits',
    debug: 'bower_components/debug/debug',
    mout: 'bower_components/mout/src'
  },
  packages: [{
    name: 'auth',
    location: 'bower_components/auth/src'
  },{
    name: 'livefyre-auth',
    location: 'bower_components/livefyre-auth/src'
  },{
    name: 'lfsp-delegate',
    location: '.',
    main: 'index'
  }]
});
