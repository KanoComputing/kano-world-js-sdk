var xtag = window.xtag;
xtag.register('kano-tc-check', {
    content: function () {/*
        <div class="kano-tc-check">
            <input id="input" type='checkbox' style='vertical-align: middle'/>
            <span style='vertical-align: middle'>I accept all the
                <a href='/terms-of-use'  target='_blank'> Terms and Conditions </a>
            </span>
        </div>
    */},
    lifecycle: {
        created: function () {
            this.isValid = false;
            this.pristine = true;
            this.input = xtag.query(this, '#input')[0];
        },
        inserted: function () {
            xtag.addEvent(this.input, 'change', function () {
                this.isValid = this.input.checked;
                this.pristine = false;
            }.bind(this));
        }
    }
});
