require([
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/request",
    "dojo/_base/array",
    "dojo/on",
    "dojo/keys",
    "dojo/NodeList-dom",
    "dojo/domReady!"
], function (dom, domConstruct, request, dojoArray, on, keys) {
    var list = dom.byId("todo-list");

    function addTodo(todo) {
        var className = "task";
        if (todo.completed) {
            className += " done";
        }
        domConstruct.create("li", {
            innerHTML: todo.name,
            className: className
        }, list);
    }

    // Fetch all todos and displays them on the page

    request.get("/api/todos", {
            handleAs: "json"
        }).then(function addTodos(todos) {
            dojoArray.forEach(todos, function (todo) {
                addTodo(todo);
            });
        }).catch(function (err) {
            console.log(err);
        });

    // When a new todo is entered, adds it to db and to the dom
    var todoInput = dom.byId("todoInput");
    on(todoInput, "keydown", function (event) {
        if (event.keyCode === keys.ENTER && todoInput.value !== "") {
            // take the value of the input, then clear the input field
            var todoValue = todoInput.value;
            todoInput.value = "";

            // make the post request and update the todo list in the dom
            request.post("/api/todos", {
                handleAs: "json",
                data: {
                    name: todoValue
                }
            }).then(function (newTodo) {
                addTodo(newTodo);
            }).catch(function (err) {
                console.log(err);
            });
        }
    });
});