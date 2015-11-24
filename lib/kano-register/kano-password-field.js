var xtag = window.xtag;

// password field component
xtag.register('kano-password-field', {
    content: function () {/*
        <div class="kano-password-field">
            <label>Password</label>
            <div class="password-field">
                <div class='password-indicator' id='passwordIndicator'>
                    <img id='showPassword' src='assets/init-flow/show-icon.png' />
                    <img id='hidePassword' src='assets/init-flow/hide-icon.png' class='hide' />
                </div>
                <input id="input" class='block' type='text' required/>
                <div id="errors" class="errors"></div>
            </div>
        </div>
    */
    },
    accessors: {
        value: {
            attribute: {},
            get: function () {
                return this.data.value;
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
            this.data.showPassword = true;
            this.data.passwordOk = false;
            this.input = xtag.query(this, '#input')[0];
            this.errors = xtag.query(this, '#errors')[0];
            this.isValid = false;
            this.pristine = true;
        },
        inserted: function () {
            var indicators = xtag.query(this, '#showPassword,#hidePassword');
            xtag.addEvent(xtag.query(this, '#passwordIndicator')[0], 'click', function () {
                indicators.forEach(function (el) {
                    el.classList.toggle('hide');
                });
                this.data.showPassword = !this.data.showPassword;
                this.input.setAttribute('type', this.data.showPassword ? 'text' : 'password');
            }.bind(this));
        }
    },

    methods: {
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
        keyup: function () {
            clearTimeout(this.data.timeout);
            this.data.timeout = setTimeout(this.valueSetter.bind(this, this.input.value), 200);
        }
    }
});
