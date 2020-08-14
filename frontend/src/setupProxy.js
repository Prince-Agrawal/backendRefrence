// setup proxy to bypass the issues from google redirection
// bellow link will be usefull for referrence
// https://stackoverflow.com/questions/59036377/cors-error-google-oauth-from-react-to-express-passportjs-validation
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/auth/google", {
            target: "http://localhost:3000",
        })
    );
};
