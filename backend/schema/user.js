const Mongoose = require("mongoose");
const Bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("../auth/generateTokens");
const Token = require("./token");
const getUserInfo = require("../lib/getUserInfo");

const UserSchema = new Mongoose.Schema({
    id: { type: Object },
    userName: { type: String, required: true, unique: true },
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String, required: true},
    password: {type: String, required: true},
});
UserSchema.pre('save', function (next) {
    if (this.isModified('password') || this.isNew) {
        const document = this;
        Bcrypt.hash(document.password, 10, (err, hash) => {
            if (err) {
                next(err);
            } else {
                document.password = hash;
                next();
            }
        });
    } else {
        next();
    }
});
UserSchema.methods.userNameExist = async function (userName) {
    const result = await Mongoose.model("User").findOne({ userName });
    return !! result
};

UserSchema.methods.comparePassword = async function (password, hash) {
    const same = await Bcrypt.compare(password, hash);
    return same
}
UserSchema.methods.createAccessToken = function () { 
    return generateAccessToken(getUserInfo(this));
}
UserSchema.methods.createRefreshToken = async function () {
    const refreshToken = generateRefreshToken(getUserInfo(this));
    try {
        await new Token({ token: refreshToken }).save();
        return refreshToken;
    } catch (error) {
        console.log(error);
    }
}

module.exports = Mongoose.model("User", UserSchema);