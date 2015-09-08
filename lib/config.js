var env = window.ENV || 'development';

var config = {
	development: {
		WORLD_URL	: 'http://localhost:5000',
		API_URL		: 'http://localhost:1234'
	},
	staging: {
		WORLD_URL	: 'http://world-staging.kano.me',
		API_URL		: 'http://api-staging.kano.me'
	},
	production: {
		WORLD_URL	: 'http://world.kano.me',
		API_URL		: 'https://api.kano.me'
	}
};