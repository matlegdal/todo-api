var db = require("../models");

exports.indexTodos = function (req, res) {
    db.Todo.find()
        .then(function (todos) {
            res.json(todos);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

exports.createTodo = function (req, res) {
    db.Todo.create(req.body)
        .then(function (newTodo) {
            res.status(201).json(newTodo);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

exports.showTodo = function (req, res) {
    db.Todo.findById(req.params.todoId)
        .then(function (foundTodo) {
            res.json(foundTodo);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

exports.updateTodo = function (req, res) {
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
};

exports.deleteTodo = function (req, res) {
    db.Todo.findByIdAndRemove(req.params.todoId)
        .then(function () {
            res.status(200).send();
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};


module.exports = exports;