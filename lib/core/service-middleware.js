var config = require('../config');

module.exports = function (req, next) {
    req.setRequestHeader('Accept', 'application/vnd.kano+json; version=' + config.apiVersion);

    if (localStorage.KW_TOKEN) {
        req.setRequestHeader('Authorization', localStorage.KW_TOKEN);
    }

    next();
};