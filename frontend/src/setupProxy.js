const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://3.38.240.217:8080",
      // target: "http://localhost:8080",
      changeOrigin: true,
    })
  );
};
