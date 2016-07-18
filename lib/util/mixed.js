var haikunate = require('haikunator'),
    DINOPASS_URL = 'http://www.dinopass.com/password';

function getPass (type) {
    return fetch(DINOPASS_URL + '/' + type)
    .catch(function () {
        return haikunate({delimiter: ''});
    });
}

exports.escapeRegExp = function (str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
};

exports.getSimpleCombination = function () {
    return getPass('simple');
};

exports.getStrongCombination = function () {
    return getPass('strong');
};
