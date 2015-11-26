var xtag = window.xtag;

module.exports = function (api, config) {
    xtag.register('kano-login-form', {
        content: function () {/*
            <form id="form">
                <div id="kano-login-form-errors" style="display: none"></div>
                <kano-username-field silent-validation="true" check-available="false" generator="false"></kano-username-field>
                <kano-password-field silent-validation="true"></kano-password-field>
                <button type="submit" class="block success">Login</button>
                <div id="spinner" class="spinner" style="display: none"></div>
                <hr/>
                <div class="actions">
                    <a id="signup-link" href class="small">Sign up</a><span class="small"> - </span><a id="reset" class="small" target="_blank">Forgot your password?</a>
                </div>
            </form>
        */},
        lifecycle: {
            created: function () {
                this.form = xtag.query(this, '#form')[0];
                this.username = xtag.query(this, 'kano-username-field')[0];
                this.password = xtag.query(this, 'kano-password-field')[0];
                this.errors = xtag.query(this, '#kano-login-form-errors')[0];
                this.signupLink = xtag.query(this, '#signup-link')[0];
                xtag.query(this, '#reset')[0].href = config.WORLD_URL + '/reset-password';
            },
            inserted: function () {
                xtag.addEvent(this.form, 'submit', function (e) {
                    var data;
                    e.preventDefault();
                    data = {
                        email: this.username.value,
                        password: this.password.value
                    };

                    api.auth.post(data)
                    .then(function (res) {
                        var ev = new Event('success');
                        ev.details = res.body.session;
                        this.dispatchEvent(ev);
                        this.displayError();
                    }.bind(this))
                    .catch(function (err) {
                        var ev = new Event('error');
                        ev.details = err.body;
                        this.dispatchEvent(ev);
                        this.displayError(err.body);
                    }.bind(this));
                    // Submit data
                }.bind(this));
                xtag.addEvent(this.signupLink, 'click', function (e) {
                    var ev = new Event('signup-click');
                    this.dispatchEvent(ev);
                    e.preventDefault();
                }.bind(this));
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
};
