var auth = require('./core/auth'),
    urlUtil = require('./util/url'),
    appStorage = require('./core/appStorage'),
    apiService = require('./core/kano-api');

function init(callback) {
    var token = urlUtil.getQueryParam('token'),
        loginError = urlUtil.getQueryParam('loginError');

    if (token) {
        auth.setToken(token);
        window.location.search = '';
    } else {
        token = auth.getToken();
    }

    if (token) {

        auth.initSession(callback);

    } else if (loginError) {
        callback(new Error(loginError), null);
    } else {
        callback(null, null);
    }

    bindEvents();
}

function bindEvents() {
    document.addEventListener('click', function (e) {
        if (e.target.hasAttribute('data-kano-world-login')) {
            auth.login();
        } else if (e.target.hasAttribute('data-kano-world-logout')) {
            auth.logout();
        }
    });
}

var sdk = {
    auth       : auth,
    init       : init,
    appStorage : appStorage,
    api        : apiService
};

if (module) {
    module.exports = sdk;
}

if (window) {
    window.KW_SDK = sdk;
}