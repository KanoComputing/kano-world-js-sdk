module.exports = function (api) {
    require('./kano-password-field')();
    require('./kano-username-field')(api);
    require('./kano-email-field')();
    require('./kano-tc-check')();
    require('./kano-login-form')(api);
    require('./kano-signup-form')(api);
};
