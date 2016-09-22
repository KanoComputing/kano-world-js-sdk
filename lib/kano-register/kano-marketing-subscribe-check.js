var xtag = require('x-tag');

module.exports = function (api, config) {
    xtag.register('kano-marketing-subscribe-check', {
        content:
            /*jshint multistr: true */
            '<label class="kano-marketing-subscribe-check">\
                <input id="input-marketing-subscribe-check" type="checkbox"/>\
                <span style="vertical-align: middle">Be the first to know Kano\’s news</a>\
                </span>\
            </label>',
            /*jshint multistr: false */
        accessors: {
            value: {
                attribute: {},
                get: function () {
                    return this.input ? this.input.checked : false;
                }
            }
        },
        lifecycle: {
            created: function () {
                this.style.display = 'block';
                this.isValid = true;
                this.pristine = false;
                this.input = xtag.query(this, '#input-marketing-subscribe-check')[0];
            }
        }

    });
};
