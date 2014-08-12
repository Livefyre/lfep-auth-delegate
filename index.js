/** @fileoverview Livefyre Simple Profiles authentication delegate */

var useragent = require('./util/user-agent');

/** @enum {string} */
var SP_EVENTS = {
    LOGIN_COMPLETE: 'auth_login_complete',
    LOGOUT_COMPLETE: 'auth_logout_complete',
    LOGOUT_FAIL: 'auth_login_failure'
};

/**
 * @param {Object=} opt_config Configuration options
 * @constructor
 */
function LfspDelegate(opt_config) {
    var config = opt_config || {};

    var spObject = this.spObject = window.fyre.sp;
    this.engageApp = new spObject.app.Engage(config.engageOpts || {});
    this.profileApp = new spObject.app.Profile(config.profileOpts || {});
}

/**
 * @param {function()} callback
 */
LfspDelegate.prototype.login = function(callback) {
    function success(data) {
        this.spObject.off(SP_EVENTS.LOGIN_COMPLETE, success);
        this.spObject.off(SP_EVENTS.LOGOUT_FAIL, failure);
        callback(null);
    }
    function failure() {
        this.spObject.off(SP_EVENTS.LOGOUT_FAIL, failure);
        this.spObject.off(SP_EVENTS.LOGIN_COMPLETE, success);
        callback(new Error());
    }
    this.engageApp.signIn();
    this.spObject.on(SP_EVENTS.LOGIN_COMPLETE, success, this);
    this.spObject.on(SP_EVENTS.LOGOUT_FAIL, failure, this);
};

/**
 * @param {function()} callback
 */
LfspDelegate.prototype.logout = function(callback) {
    this.engageApp.signOut();
    callback();
};

/**
 * It really seems like the lfsp profiles app should take care of most of this
 * stuff.
 * @param {Object} author
 */
LfspDelegate.prototype.viewProfile = function(author) {
    var id, profileUrl;

    if (author.isCuratedAuthor) {
        profileUrl = author.profileUrl;
        if (!profileUrl) {
            return;
        }
        if (useragent.isMobile) {
            location.href = profileUrl;
            return;
        }
        window.open(author.profileUrl,'authWindow',
            'location=true;menubar=false;resizable=false;scrollbars=false');
        return;
    }
    id = author.id.split('@')[0];
    this.profileApp.viewProfile(id);

};

/**
 * Launch edit profile from lfsp.
 */
LfspDelegate.prototype.editProfile = function() {
    this.profileApp.editProfile();
};

/**
 * Listen to all SP Login Complete events, even those not initiated by a login.
 */
LfspDelegate.prototype.forEachAuthentication = function (callback) {
    this.spObject.on(SP_EVENTS.LOGIN_COMPLETE, function(data) {
        callback({
            livefyre: data['token']
        });
    });
};

/**
 * Clean up any handlers, etc.
 */
LfspDelegate.prototype.destroy = function() {
    this.spObject.off(null, null, this);
    this.profileApp =
    this.engageApp = null;
};

module.exports = LfspDelegate;
