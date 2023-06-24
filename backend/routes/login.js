const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonResponse");
const User = require("../schema/user");
const getUserInfo = require("../lib/getUserInfo");

router.post("/", async (req, res) => {
    const { userName, password } = req.body;
    if (!!!userName || !!!password) {
        return res.status(400).json(
            jsonResponse(400, {
                error: "Fields are required",
            })
        );
    }
    //autenticar usuario.
    const user = await User.findOne({ userName });
    if (user) {
        const correctPassword = await user.comparePassword(password, user.password);
        if (correctPassword) {
            const accessToken = user.createAccessToken();
               const refreshToken = await user.createRefreshToken();
               res.status(200).json(jsonResponse(200, {user: getUserInfo(user), accessToken, refreshToken}));
        } else {
             res.status(400).json(
            jsonResponse(400, {
                error: "Password or username are incorrect",
            })
        );
        }

    } else {
        res.status(400).json(
            jsonResponse(400, {
                error: "User not found",
            })
        );
    }
});

module.exports = router