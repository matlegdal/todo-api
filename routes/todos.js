var express = require("express"),
    db = require("../models"),
    router = express.Router();

router.get("/", function (req, res) {
    db.Todo.find()
    .then(function(todos){
        res.json(todos);
    })
    .catch(function(err){
        res.send(err);
    });
});

module.exports = router;