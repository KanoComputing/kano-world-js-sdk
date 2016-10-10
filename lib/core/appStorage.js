var auth, apiService;

module.exports = function (config) {
    auth = require('./auth')(config);
    apiService = require('./kano-api')(config);

    return {
        get: function (appName, callback) {
            callback = callback || function () {};

            var user = auth.getUser();

            if (!user) {
                return callback(new Error('This action requires login'));
            }

            apiService.users.get.byId({ id: user.id })
            .then(function (res) {

                callback(null, res.body.user.profile.stats[appName] || {});

            }, function (res) {

                callback(new Error(res.body));

            });
        },

        set: function (appName, data, callback) {
            var stats = {};

            stats[appName] = data;

            callback = callback || function () {};

            if (!auth.getUser()) {
                return callback(new Error('This action requires login'));
            }

            apiService.users.profile.update({
                stats: stats
            })
            .then(function (res) {

                callback(null, res.body.user.profile);

            }, function (res) {

                callback(new Error(res.body));

            });
        }
    };
};