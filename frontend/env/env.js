	module.exports = {
	NODE_ENV: 'none',
	MODE_ENV: {
		local: {
			api: 'http://scb-chatapp.minerva.vn',

			//dev
			show_log: true,
			hot: true,
			liveReload: true,
			host: 'localhost',

			port: 4000,

		},
		dev: {
			api: 'http://scb-chatapp.minerva.vn',
			// api: 'http://192.168.157.153:9100',
		},
		sta: {
			api: 'http://chatapp.minerva.vn',
			cloudapi: 'https://cloudapi.minerva.vn',
		},
		prod: {
			api: 'http://chatapp.minerva.vn',
			cloudapi: 'https://cloudapi.minerva.vn',
		},
	}
};
