const { jsonResponse } = require("../lib/jsonResponse");
const User = require("../schema/user");
const router = require("express").Router();

router.post("/", async (req, res) => {
    const { firstName, lastName, userName, email, password } = req.body;
    if (!!!firstName || !!!lastName || !!!userName || !!!email || !!!password) {
        return res.status(400).json(
            jsonResponse(400, {
                error: "Fields are required",
            })
        );
    }
    try {
         const user = new User();
         const exists = await user.userNameExist(userName);
         if (exists) {
        return res.status(400).json(
            jsonResponse(400, {
                error: "Username already exist"
            })
        )
    }
    const newUser = new User({firstName, lastName, userName, email, password});
    await newUser.save();
    res.status(200).json(jsonResponse(200, { message: "User create successfully." }));
    res.send("Siginup");
    } catch (error) {
        return res.status(400).json(
            jsonResponse(500, {
                error: "Username already exist"
            })
        );
    }
});


module.exports = router