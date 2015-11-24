var xtag = window.xtag,
    api = require('../core/kano-api')();
//whole form component
xtag.register('kano-signup-form', {
    content: function () {/*
        <form id="form">
            <div id="kano-signup-form-errors" style="display:none"></div>
            <kano-username-field></kano-username-field>
            <kano-password-field></kano-password-field>
            <kano-email-field></kano-email-field>
            <kano-tc-check></kano-tc-check>
            <div class="buttons">
                <button id="signup-button" class="register-button success" type="submit">Join Kano World</button>
                <button id="already-signedup-button" class="already-registered-button secondary" type="button">I'm already registered</button>
            </div>
        </form>
    */},
    lifecycle: {
        created: function () {
            this.data = {};
            this.signupButton = xtag.query(this, '#signup-button')[0];
            this.form = xtag.query(this, '#form')[0];
            this.loginButton = xtag.query(this, '#already-signedup-button')[0];
            this.fields = xtag.query(this, 'kano-username-field,kano-password-field,kano-email-field,kano-tc-check');
            this.username = xtag.query(this, 'kano-username-field')[0];
            this.password = xtag.query(this, 'kano-password-field')[0];
            this.errors = xtag.query(this, '#kano-signup-form-errors')[0];
            this.email = xtag.query(this, 'kano-email-field')[0];
        },
        inserted: function () {
            xtag.addEvent(this.form, 'submit', function (e) {
                var isValid,
                    data;
                e.preventDefault();
                isValid = this.fields.every(function (field) {
                    return !field.pristine && field.isValid;
                });
                if (isValid) {
                    data = {
                        username: this.username.value,
                        password: this.password.value,
                        email: this.email.value
                    };
                    api.users.post(data)
                    .then(function (res) {
                        var ev = new Event('success');
                        ev.details = res.body.session;
                        this.dispatchEvent(ev);
                        this.displayError();
                    }.bind(this))
                    .catch(function (err) {
                        console.log('err', err);
                        this.displayError(err.body);
                    }.bind(this));
                    // handle data
                } else {
                    // handle error
                }
            }.bind(this));
            xtag.addEvent(this.loginButton, 'tap', function () {
                var e = new Event('login-click');
                this.dispatchEvent(e);
            });
        }
    },

    methods: {
        displayError: function (error) {
            if (error && error.length) {
                this.errors.innerHTML = error;
                this.errors.style.display = 'block';
            } else {
                this.errors.style.display = 'none';
            }
        }
    }
});
