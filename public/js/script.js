require([
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/request",
    "dojo/_base/array",
    "dojo/on",
    "dojo/query",
    "dojo/keys",
    "dojo/store/Memory",
    "dojo/NodeList-dom",
    "dojo/domReady!"
], function (dom, domConstruct, request, dojoArray, on, query, keys, Memory) {
    var list = dom.byId("todo-list");
    var store = new Memory();

    function addTodo(todo) {
        var className = "task";
        if (todo.completed) {
            className += " done";
        }
        var li = domConstruct.create("li", {
            innerHTML: `${todo.name} <span class="btn-delete">X</span>`,
            className: className
        }, list);

        // store the id and the node in the memory
        store.put({
            id: todo._id,
            node: li
        });
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

    // delete a todo with event delegation
    on(list, ".btn-delete:click", function () {
        // retrieve the data from the memory
        var data = store.query({ node: this.parentNode })[0];
        // send the delete request
        request.del(`/api/todos/${data.id}`, {
            handleAs: "json"
        }).then(function(){
            domConstruct.destroy(data.node);
        }).catch(function(err){
            console.log(err);
        });
    });

});