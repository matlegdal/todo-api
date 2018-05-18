var express = require("express"),
    controllers = require("../controllers/todos"),
    router = express.Router();

router.route("/")
    .get(controllers.indexTodos)
    .post(controllers.createTodo);

router.route("/:todoId")
    .get(controllers.showTodo)
    .put(controllers.updateTodo)
    .delete(controllers.deleteTodo);

module.exports = router;