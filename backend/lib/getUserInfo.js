function getUserInfo(user) {
    return {
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id || user._id,
        email: user.email,
    };
}
module.exports = getUserInfo;