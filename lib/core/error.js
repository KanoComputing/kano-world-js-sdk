function handle(err) {
    console.error('[ CAUGHT ]', err && err.stack ? err.stack : err);
}

module.exports = {
    handle : handle
};