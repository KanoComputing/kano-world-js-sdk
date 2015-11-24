var urlUtil = require('./util/url');

var sdk, auth, apiService, appStorage;

sdk = function (config) {
    auth = require('./core/auth')(config);
    apiService = require('./core/kano-api')(config);
    appStorage = require('./core/appStorage')(config);

return{

        auth       : auth,
        appStorage : appStorage,
        api        : apiService,
        registerForms   : function () {
            require('./kano-register/kano-register');
        }
    };
};


if (module) {
    module.exports = sdk;
}

if (window) {
    window.KW_SDK = sdk;
}
