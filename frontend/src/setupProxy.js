const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://3.36.128.239:8080",
      // target: "http://localhost:8080",
      changeOrigin: true,
    })
  );
};
