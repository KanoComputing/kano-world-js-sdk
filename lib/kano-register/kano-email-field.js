var xtag = window.xtag;

module.exports = function () {
    xtag.register('kano-email-field', {
        content: function () {/*
            <div class="kano-email-field">
                <label>Email Address</label>
                <input id="input" class='block' type='email' autofocus placeholder='E.g. johndoe@gmail.com' required />
                <div id="errors" class="errors"></div>
            </div>
        */},

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
            }
        },

        lifecycle: {
            created: function () {
                this.data = {};
                this.input = xtag.query(this, '#input')[0];
                this.errors = xtag.query(this, '#errors')[0];
                this.isValid = false;
                this.pristine = true;
            }
        },

        events: {
            change: function () {
                clearTimeout(this.data.timeout);
                this.data.timeout = setTimeout(this.valueSetter.bind(this, this.input.value), 200);
            }
        },

        methods: {
            valueSetter: function (val, fromOutside) {
                var errors = this.getFormatErrors(val),
                    errorMessage;
                this.pristine = false;
                if (!errors) {
                    this.data.value = val;
                    this.displayError();
                    this.isValid = true;
                    if (fromOutside) {
                        this.input.value = val;
                    }
                } else {
                    errorMessage = errors.reduce(function (acc, item) {
                        return acc + '<li>' + item + '</li>';
                    }, '<b>Email must</b><ul>');
                    errorMessage += '</ul>';
                    this.displayError(errorMessage);
                }
            },
            getFormatErrors: function (email) {
                if (!/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(email)) {
                    return ['be valid!'];
                }
                return null;
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
