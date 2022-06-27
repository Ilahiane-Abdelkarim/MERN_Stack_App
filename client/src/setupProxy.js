const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://ila-test1.herokuapp.com',
            changeOrigin: true,
        })
    );
};