var tap = require('tap');
var test = tap.test;

global.window = {};

window.navigator = {
    userAgent: 'fyreAgent'
}

window.fyre = {
    sp: {
        app: {
            Engage: function() {},
            Profile: function() {}
        },
        on: function() {},
        off: function() {}
    }
};

var LfspDelegate = require('../index');

test('\n has viewProfile and editProfile handlers', function(t) {
    t.ok(typeof LfspDelegate.prototype.viewProfile === 'function');
    t.ok(typeof LfspDelegate.prototype.editProfile === 'function');
    t.end();
});

test('\n has login, loadSession, and logout handlers', function(t) {
    t.ok(typeof LfspDelegate.prototype.login === 'function');
    t.ok(typeof LfspDelegate.prototype.logout === 'function');
    t.end();
});

test('\n has a forEachAuthentication deferred', function(t) {
    t.ok(typeof LfspDelegate.prototype.forEachAuthentication === 'function');
    t.end();
});

test('\n is constructable and destroyable', function(t) {
    var delegate = new LfspDelegate('abc', 'def');
    t.ok(typeof LfspDelegate.prototype.logout === 'function');
    t.end();
});
