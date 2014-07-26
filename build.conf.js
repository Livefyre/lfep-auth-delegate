({
    mainConfigFile: './requirejs.conf.js',
    name: 'lfep-auth-delegate',
    out: './dist/index.js',
    optimize: 'uglify2',
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
