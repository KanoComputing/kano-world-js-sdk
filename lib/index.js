var urlUtil = require('./util/url');

var sdk, auth, apiService, appStorage;

sdk = function (config) {
    auth = require('./core/auth')(config);
    apiService = require('./core/kano-api')(config);
    appStorage = require('./core/appStorage')(config);

    function bindEvents() {
        document.addEventListener('click', function (e) {
            if (e.target.hasAttribute('data-kano-world-login')) {
                auth.login();
            } else if (e.target.hasAttribute('data-kano-world-logout')) {
                auth.logout();
            }
        });
    };

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

    return {
        auth       : auth,
        appStorage : appStorage,
        api        : apiService,
        init       : init
    };
};
    

if (module) {
    module.exports = sdk;
}

if (window) {
    window.KW_SDK = sdk;
}