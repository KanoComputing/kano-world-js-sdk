var token = null,
    session = null,
    isKW,
    auth,
    xdAuth;

module.exports = function (config) {
    config = config ? config : require('../config');
    isKW = config.WORLD_URL.indexOf(location.origin.replace(/(http:|https:)/, '')) !== -1;

    apiService = require('./kano-api')(config);
    xdAuth = require('./xd-auth')(config);

    auth = {
        setToken: function (val, disableCross) {
            token = val;

            if (!token) {
                localStorage.removeItem('KW_TOKEN');

                /* This token is used by the new part of Kano World */
                localStorage.removeItem('KW_TOKENv2');
            } else {
                localStorage.setItem('KW_TOKEN', token);
            }
            if (!disableCross && !isKW) {
                xdAuth.setToken(token);
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
            if (!isKW) {
                xdAuth.crossLogout(function (err) {
                    if (reload) {
                        location.reload();
                    }
                });
            }
        },

        getUser: function () {
            return session ? session.user : null;
        },

        initSession: function (callback) {
            function onToken(tk) {
                auth.setToken(tk, true);
                apiService.auth.session.get()
                    .then(function (res) {
                        session = res.body.session;
                        if (callback) {
                            callback(null, session.user);
                        }
                    }, function (res) {
                        if (callback) {
                            callback(new Error(res.body));
                        }
                    });
            }

            // Check for any existing token, and use that if present
            token = token || localStorage.getItem('KW_TOKEN');

            if (token) {
                p = onToken(token);
            }

            // Otherwise, contact KW to get the token throught the iframe
            xdAuth.getCrossToken(function (err, tk) {
                onToken(tk);
            });
        }
    };

    return auth;
};
