var error = require('./error'),
    token = null,
    session = null,
    apiService,
    auth;

module.exports = function (config) {
    config = config ? config : require('../config');

    apiService = require('./kano-api')(config);

    auth = {
        setToken: function (val) {
            token = localStorage.KW_TOKEN = val;

            if (!token) {
                localStorage.removeItem('KW_TOKEN');
            }
        },

        getToken: function () {
            return token || localStorage.KW_TOKEN;
        },

        login: function (token) {
            auth.setToken(token);
        },

        logout: function () {
            auth.setToken(null);
            location.reload();
        },

        getUser: function () {
            return session ? session.user : null;
        },

        initSession: function (callback) {
            apiService.auth.session.get()
            .then(function (res) {

                session = res.body.session;

                if (callback) {
                    callback(null, session.user);
                }

            }, function (res) {

                auth.setToken(null);

                if (callback) {
                    callback(new Error(res.body));
                }

            })
            .catch(error.handle);
        }
    };

    return auth;
};
