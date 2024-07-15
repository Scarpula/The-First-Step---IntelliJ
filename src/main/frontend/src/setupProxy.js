const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/ask',
    createProxyMiddleware({
      target: 'http://112.217.124.195:30001',
      changeOrigin: true,
    })
  );
};
