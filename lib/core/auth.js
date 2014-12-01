var config = require('../config'),
    apiService = require('./kano-api'),
    error = require('./error');

var token = null,
    session = null;

function setToken(val) {
    token = localStorage.KW_TOKEN = val;

    if (!token) {
        localStorage.removeItem('KW_TOKEN');
    }
}

function getToken() {
    return token || localStorage.KW_TOKEN;
}

function login() {
    location.href = config.WORLD_URL + '/external/login?redirect_url=' + location.href;
}

function logout() {
    setToken(null);
    location.reload();
}

function getUser() {
    return session ? session.user : null;
}

function initSession(callback) {
    apiService.auth.session.get()
    .then(function (res) {

        session = res.body.session;

        if (callback) {
            callback(null, session.user);
        }

    }, function (res) {

        setToken(null);

        if (callback) {
            callback(new Error(res.body));
        }

    })
    .catch(error.handle);
}

module.exports = {
    setToken    : setToken,
    getToken    : getToken,
    login       : login,
    logout      : logout,
    initSession : initSession,
    getUser     : getUser
};