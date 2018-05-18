var express = require("express"),
    router = express.Router();

router.get("/", function (req, res) {
    res.send("hello from routes");
});

module.exports = router;