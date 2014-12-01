var auth = require('./auth'),
    apiService = require('./kano-api'),
    error = require('./error');

function get(appName, callback) {
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

    })
    .catch(error.handle);
}

function set(appName, data, callback) {
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

    })
    .catch(error.handle);
}

module.exports = {
    get : get,
    set : set
};