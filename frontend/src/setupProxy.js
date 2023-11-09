import { API_BASE_URL } from "../utils/URL";

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: API_BASE_URL,
      changeOrigin: true,
    })
  );
};
