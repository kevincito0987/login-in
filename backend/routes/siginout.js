const router = require("express").Router();
router.get("/", (req, res) => {
    res.send("Siginout");
});
module.exports = router