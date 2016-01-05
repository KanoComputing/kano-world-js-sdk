var xtag = window.xtag;

module.exports = function (api, config) {
    xtag.register('kano-tc-check', {
        content:
            /*jshint multistr: true */
            '<label class="kano-tc-check">\
                <input id="input" type="checkbox"/>\
                <span style="vertical-align: middle">I accept all the\
                    <a href id="terms"  target="_blank"> Terms and Conditions </a>\
                </span>\
            </label>',
        lifecycle: {
            created: function () {
                this.isValid = false;
                this.pristine = true;
                this.input = xtag.query(this, '#input')[0];
                xtag.query(this, '#terms')[0].href = config.WORLD_URL + '/terms-of-use';
            },
            inserted: function () {
                xtag.addEvent(this.input, 'change', function () {
                    this.isValid = this.input.checked;
                    this.pristine = false;
                }.bind(this));
            }
        }
    });
};
