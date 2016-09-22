var error = require('./error'),
    token = null,
    session = null,
    auth,
    xdAuth;

module.exports = function (config) {
    config = config ? config : require('../config');

    apiService = require('./kano-api')(config);
    xdAuth = require('./xd-auth')(config);

    auth = {
        setToken: function (val) {
            token = val;

            if (!token) {
                localStorage.removeItem('KW_TOKEN');
            } else {
                localStorage.setItem('KW_TOKEN', token);
            }
        },

        getToken: function () {
            return token || localStorage.KW_TOKEN;
        },

        login: function () {
            location.href = config.WORLD_URL + '/external/login?redirect_url=' + location.href;
        },

        logout: function (reload) {
            reload = typeof reload === 'undefined' ? true : reload;
            auth.setToken(null);
            xdAuth.crossLogout(function (err) {
                if (reload) {
                    location.reload();
                }
            });
        },

        getUser: function () {
            return session ? session.user : null;
        },

        initSession: function (callback) {
            xdAuth.getCrossToken(function (err, tk) {
                if (tk) {
                    auth.setToken(tk);
                }
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
            });
        }
    };

    return auth;
};
