({
    mainConfigFile: './requirejs.conf.js',
    name: 'lfep-auth-delegate',
    out: './dist/index.min.js',
    optimize: 'uglify2',
    paths: {
      almond: 'bower_components/almond/almond'
    },
    include: ['almond'],
    cjsTranslate: true,
    uglify2: {
      compress: {
        unsafe: true
      },
      mangle: true
    },
    wrap: {
      startFile: './tools/wrap-start.frag',
      endFile: './tools/wrap-end.frag'
    }
})
