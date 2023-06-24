const getTokenFromdHeader = require("./getTokenFromHeader");
const {jsonResponse} = require("../lib/jsonResponse");
const { verfyAccessToken } = require("./verfyTokens");

function authenticate(req, res, next) {
    const token = getTokenFromdHeader(req.headers);

    if (token) {
        const decoded = verfyAccessToken(token);
        if (decoded) {
            req.user = { ...decoded.user };
            next();
        } else {
            res.status(401).send(jsonResponse(401, {error: "No token Privided"}));
        }
    } else {
        res.status(401).send(jsonResponse(401, {error: "No token Privided"}));
    }
}
module.exports = { authenticate };