var generateUsername = require('../util/mixed').getSimpleCombination,
    xtag = require('x-tag');

module.exports = function (api) {
    // username field component
    xtag.register('kano-username-field', {
        content:
            /*jshint multistr: true */
            '<div class="x-username-field">\
                <label style="float: left">Username</label>\
                <div id="generateUsername" class="generate-nickname">Generate a Random Name</div>\
                <input id="input" class="block" type="text" required/>\
                <div id="errors" class="errors"></div>\
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
            checkAvailable: {
                attribute: {},
                set: function (val) {
                    this.data.checkAvailable = (val === 'true');
                },
                get: function () {
                    return this.data.checkAvailable;
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
            generator: {
                attribute: {},
                set: function (val) {
                    this.data.generator = (val === "true");
                    xtag.query(this, '#generateUsername')[0].style.display = this.data.generator ? 'inline-block' : 'none';
                },
                get: function () {
                    return this.data.generator;
                }
            }
        },

        lifecycle: {
            created: function () {
                this.data = {
                    checkAvailable: true,
                    generator: true
                };
                this.input = xtag.query(this, '#input')[0];
                this.errors = xtag.query(this, '#errors')[0];
                this.isValid = false;
                this.pristine = true;
            },
            inserted: function () {
                xtag.addEvent(xtag.query(this, '#generateUsername')[0], 'click', function () {
                    generateUsername().then(function (data) {
                        this.valueSetter(data, true);
                    }.bind(this));
                }.bind(this));
            }
        },
        events: {
            change: function () {
                clearTimeout(this.data.timeout);
                this.data.timeout = setTimeout(this.valueSetter.bind(this, this.input.value), 500);
            }
        },
        methods: {
            displayValidValue: function (val, fromOutside) {
                this.displayError();
                this.data.value = val;
                this.isValid = true;
                if (fromOutside) {
                    this.input.value = val;
                }
            },
            valueSetter: function (val, fromOutside) {
                var errors = this.getFormatErrors(val),
                    errorMessage;
                this.pristine = false;
                if (!errors || this.data.silentValidation) {
                    if (this.data.checkAvailable) {
                        this.checkAvailability(val)
                            .then(function (available) {
                                if (available) {
                                    this.displayValidValue(val, fromOutside);
                                } else {
                                    this.displayError('<b> Username has been taken :( </b>');
                                }
                            }.bind(this));
                    } else {
                        this.displayValidValue(val, fromOutside);
                    }
                } else {
                    errorMessage = errors.reduce(function (acc, item) {
                        return acc + '<li>' + item + '</li>';
                    }, '<b>Usernames must</b><ul>');
                    errorMessage += '</ul>';
                    this.displayError(errorMessage);
                }
            },
            // check the syntax of a username
            getFormatErrors: function (username) {
                var errors = [];

                if (username.length < 3) {
                    errors.push('be at least 3 characters long');
                }

                if (!/^[a-zA-Z0-9_\-.]+$/.test(username)) {
                    errors.push('not contain speacial characters!');
                }
                // return the list of errors or nothing
                return errors.length ? errors : null;
            },
            // check the availability of the username
            checkAvailability: function (username) {
                return api.users.get.byUsername({
                    username: username
                })
                .then(function () {
                    return false;
                }.bind(this))
                .catch(function () {
                    return true;
                }.bind(this));
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
        }
    });
};
