var MESSAGE_NAMESPACE = 'kw-xd-auth',
    xdIframe,
    token;

module.exports = function (config) {
    config = config ? config : require('../config');

    xdAuth = {
        waitMessage: function (id, cb) {
            window.addEventListener('message', function (event) {
                var data;
                try {
                    data = JSON.parse(event.data);
                } catch (err) {

                }
                if (data && data.namespace === MESSAGE_NAMESPACE) {
                    if (data.id === id) {
                        cb(null, data);
                    } else if (data.id === 'error') {
                        cb(new Error(data.message));
                    }
                }
            }, false);
        },
        initIframe: function (src, cb) {
            var failed = false;
            xdIframe = document.createElement('iframe');
            xdIframe.setAttribute('width', 0);
            xdIframe.setAttribute('height', 0);
            xdIframe.style.display = 'none';
            xdIframe.style.visibility = 'hidden';
            xdIframe.src = src;
            xdIframe.onerror = function (e) {
                failed = true;
                cb(e);
            };
            this.waitMessage('iframe-ready', function () {
                if (!failed) {
                    cb();
                }
            });
            document.body.appendChild(xdIframe);
        },
        getToken: function (cb) {
            var data = {
                namespace: MESSAGE_NAMESPACE,
                action: 'get-token'
            };
            this.initIframe(config.WORLD_URL + '/xdAuthIframe.html', function (err) {
                if (err) {
                    return cb(err);
                }
                this.waitMessage('token', function (err, data) {
                    if (xdIframe.parentNode) {
                        xdIframe.parentNode.removeChild(xdIframe);
                    }
                    cb(err, data);
                });
                // Authorize all the origins, we have a custom origin checking system
                xdIframe.contentWindow.postMessage(JSON.stringify(data), '*');
            }.bind(this));
        },
        getCrossToken: function (cb) {
            var localToken = token || localStorage.getItem('KW_TOKEN'),
                data;
            if (localToken) {
                return cb(null, localToken);
            } else {
                return xdAuth.getToken(function (err, data) {
                    var tk;
                    if (data) {
                        tk = data.token;
                    }
                    token = tk;
                    cb(err, tk);
                });
            }
        }
    };

    return xdAuth;
};
