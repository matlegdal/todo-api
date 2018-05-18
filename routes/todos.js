var express = require("express"),
    db = require("../models"),
    router = express.Router();

// INDEX ROUTE
router.get("/", function (req, res) {
    db.Todo.find()
        .then(function (todos) {
            res.json(todos);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
});

// POST NEW TODO ROUTE
router.post("/", function (req, res) {
    db.Todo.create(req.body)
        .then(function (newTodo) {
            res.status(201).json(newTodo);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
});

// SHOW ROUTE
router.get("/:todoId", function (req, res) {
    db.Todo.findById(req.params.todoId)
        .then(function (foundTodo) {
            res.json(foundTodo);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
});

// UPDATE ROUTE
router.put("/:todoId", function (req, res) {
    db.Todo.findOneAndUpdate({
            _id: req.params.todoId
        }, req.body, {
            new: true
        })
        .then(function (todo) {
            res.json(todo);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
});

module.exports = router;