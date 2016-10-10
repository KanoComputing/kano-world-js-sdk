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
        setToken: function (token) {
            var data = {
                action: 'set-token',
                token: token
            };
            this.initIframe(config.WORLD_URL + '/xdAuthIframe.html', function (err) {
                if (err) {
                    return;
                }
                this.waitMessage('set-token', function (err, data) {
                    if (xdIframe.parentNode) {
                        xdIframe.parentNode.removeChild(xdIframe);
                    }
                });
                xdAuth.sendMessage(data);
            }.bind(this));
        },
        getToken: function (cb) {
            var data = {
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
                xdAuth.sendMessage(data);
            }.bind(this));
        },
        getCrossToken: function (cb) {
            return xdAuth.getToken(function (err, data) {
                var tk;
                if (data) {
                    tk = data.token;
                }
                token = tk;
                cb(err, tk);
            });
        },
        sendMessage: function (data) {
            data.namespace = MESSAGE_NAMESPACE;
            // Authorize all the origins, we have a custom origin checking system
            xdIframe.contentWindow.postMessage(JSON.stringify(data), '*');
        },
        crossLogout: function (cb) {
            var data = {
                action: 'remove-token'
            };
            this.initIframe(config.WORLD_URL + '/xdAuthIframe.html', function (err) {
                if (err) {
                    return cb(err);
                }
                this.waitMessage('remove-token', function (err, data) {
                    if (xdIframe.parentNode) {
                        xdIframe.parentNode.removeChild(xdIframe);
                    }
                    cb(err, data);
                });
                xdAuth.sendMessage(data);
            }.bind(this));
        }
    };

    return xdAuth;
};
