require([
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/query",
    "dojo/request",
    "dojo/_base/array",
    "dojo/on",
    "dojo/keys",
    "dojo/NodeList-dom",
    "dojo/domReady!"
], function (dom, domConstruct, query, request, dojoArray, on, keys) {
    var list = query(".list")[0];

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
        if (event.keyCode === keys.ENTER) {
            request.post("/api/todos", {
                handleAs: "json",
                data: {
                    name: todoInput.value
                }
            }).then(function (todo) {
                addTodo(todo);
                todoInput.value = "";
            }).catch(function (err) {
                console.log(err);
            });
        }
    });
});