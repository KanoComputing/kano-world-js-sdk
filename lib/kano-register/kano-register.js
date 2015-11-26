module.exports = function (api, config) {
    config = config || require('../config');
    require('./kano-password-field')(api, config);
    require('./kano-username-field')(api, config);
    require('./kano-email-field')(api, config);
    require('./kano-tc-check')(api, config);
    require('./kano-login-form')(api, config);
    require('./kano-signup-form')(api, config);
};
