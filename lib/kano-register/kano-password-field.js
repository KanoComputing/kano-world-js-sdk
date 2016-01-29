var xtag = require('x-tag');

module.exports = function () {
    // password field component
    xtag.register('kano-password-field', {
        content:
            /*jshint multistr: true */
            '<div class="kano-password-field">\
                <label>Password</label>\
                <div class="password-field">\
                    <div id="passwordIndicator" class="password-indicator show-password"></div>\
                    <input id="input" class="block" type="password" required/>\
                    <div id="errors" class="errors"></div>\
                </div>\
            </div>',
            /*jshint multistr: false */
        accessors: {
            value: {
                attribute: {},
                get: function () {
                    return this.input ? this.input.value : '';
                },
                set: function (val) {
                    this.valueSetter(val, true);
                }
            },
            silentValidation: {
                attribute: {},
                set: function (val) {
                    this.data.silentValidation = (val === "true");
                    this.showErrors(!this.data.silentValidation);
                },
                get: function () {
                    return this.data.silentValidation;
                }
            },
            showPassword: {
                attribute: {},
                set: function (val) {
                    this.data.showPassword = (val === 'true');
                    this.updatePasswordVisibility();
                }
            }
        },
        lifecycle: {
            created: function () {
                this.data = {};
                this.input = xtag.query(this, '#input')[0];
                this.errors = xtag.query(this, '#errors')[0];
                this.indicator = xtag.query(this, '#passwordIndicator')[0];
                this.isValid = false;
                this.pristine = true;
                this.data.showPassword = false;
            },
            inserted: function () {
                xtag.addEvent(this.indicator, 'click', function () {
                    this.data.showPassword = !this.data.showPassword;
                    this.updatePasswordVisibility();
                }.bind(this));
            }
        },

        methods: {
            updatePasswordVisibility: function () {
                if (this.data.showPassword) {
                    this.indicator.classList.add('show-password');
                    this.indicator.classList.remove('hide-password');
                } else {
                    this.indicator.classList.remove('show-password');
                    this.indicator.classList.add('hide-password');
                }
                this.input.setAttribute('type', this.data.showPassword ? 'text' : 'password');
            },
            getFormatErrors: function (password) {
                var errors = [];

                if (password.length < 6) {
                    errors.push('be at least 6 characters long');
                }

                if (/\s/.test(password)) {
                    errors.push('not contain blank spaces!');
                }
                return errors.length ? errors : null;
            },
            valueSetter: function (val, fromOutside) {
                var errors = this.getFormatErrors(val),
                    errorMessage;
                this.pristine = false;
                if (!errors || this.data.silentValidation) {
                    this.data.value = val;
                    this.displayError();
                    this.isValid = true;
                    if (fromOutside) {
                        this.input.value = val;
                    }
                } else {
                    errorMessage = errors.reduce(function (acc, item) {
                        return acc + '<li>' + item + '</li>';
                    }, '<b>Password must</b><ul>');
                    errorMessage += '</ul>';
                    this.displayError(errorMessage);
                }
            },
            displayError: function (message) {
                this.errors.innerHTML = message;
                if (!message || !message.length) {
                    this.errors.style.display = 'none';
                } else {
                    if (!this.data.silentValidation) {
                        this.errors.style.display = 'block';
                    }
                    this.isValid = false;
                }
            },
            showErrors: function (enabled) {
                if (enabled) {
                    this.errors.style.display = 'none';
                }
            }
        },

        events: {
            change: function () {
                clearTimeout(this.data.timeout);
                this.data.timeout = setTimeout(this.valueSetter.bind(this, this.input.value), 200);
            }
        }
    });
};
