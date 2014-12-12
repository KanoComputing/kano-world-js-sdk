var TEST_MODE = false,
    KANO_WORLD_CONFIG = window.KANO_WORLD_CONFIG || {};

TEST_MODE = KANO_WORLD_CONFIG.TEST_MODE || false;

module.exports = {
    WORLD_URL : TEST_MODE ? 'http://localhost:5000' : 'http://world.kano.me',
    API_URL   :TEST_MODE ? 'http://localhost:1234' : 'https://api.kano.me',
};