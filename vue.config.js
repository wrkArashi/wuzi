module.exports = {
	publicPath: './',
	lintOnSave: true,
	devServer: {
		port: 4040,
		// proxy: {
		// 	// 查询所有用户,没用
		// 	'/userall': {
		// 		target: 'http://127.0.0.1:8080',
		// 		changeOrigin: true, //虚拟服务器收发请求，解决跨域
		// 	},
		// 	// 查询所有物资列表,没用
		// 	'/itemTableall': {
		// 		target: 'http://127.0.0.1:8080',
		// 		changeOrigin: true, //虚拟服务器收发请求，解决跨域
		// 	},
		// }
	}
}
