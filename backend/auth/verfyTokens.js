const jwt = require("jsonwebtoken");

function verfyAccessToken(token) {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}
function verfyRefreshToken(token) {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
}

module.exports = { verfyAccessToken, verfyRefreshToken };