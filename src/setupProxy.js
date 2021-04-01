const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/proxy",
    createProxyMiddleware({
      target: "https://demo.don.red/weibo/api",
      pathRewrite: { "/proxy": "/" },
      changeOrigin: true,
    })
  );
};
