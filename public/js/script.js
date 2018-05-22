require([
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/dom-class",
    "dojo/request",
    "dojo/_base/array",
    "dojo/on",
    "dojo/query",
    "dojo/keys",
    "dojo/store/Memory",
    "dijit/form/Button",
    "dojo/NodeList-dom",
    "dojo/domReady!"
], function (dom, domConstruct, domClass, request, dojoArray, on, query, keys, Memory, Button) {
    const list = dom.byId("todo-list");
    const store = new Memory();

    function addTodo(todo) {
        let className = "task";
        if (todo.completed) {
            className += " done";
        }
        let li = domConstruct.create("li", {
            innerHTML: `${todo.name} <span class="btn-delete">X</span>`,
            className: className
        }, list);

        // store the id and the node in the memory
        store.put({
            id: todo._id,
            completed: todo.completed,
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
    const todoInput = dom.byId("todoInput");
    on(todoInput, "keydown", function (event) {
        if (event.keyCode === keys.ENTER && todoInput.value !== "") {
            // take the value of the input, then clear the input field
            let todoValue = todoInput.value;
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

    // toggle completion of the task on click
    on(list, ".task:click", function (event) {
        // check the target first --> don't know how event delegation is handled in dojo, 
        // but stop propagation doesn't work, so this is a work around.
        if (event.target.nodeName === "SPAN") {
            return;
        } else {
            // retrieve the data in Memory
            let data = store.query({
                node: this
            })[0];
            // send the put request and update the dom and update in memory
            request.put(`/api/todos/${data.id}`, {
                data: {
                    completed: !data.completed
                },
                handleAs: "json"
            }).then(function () {
                data.completed = !data.completed;
                domClass.toggle(data.node, "done");
            }).catch(function (err) {
                console.log(err);
            });
        }
    });

    // delete a todo with event delegation
    on(list, ".btn-delete:click", function () {
        // retrieve the data from the memory
        let data = store.query({
            node: this.parentNode
        })[0];
        // send the delete request and update the dom and remove from memory
        request.del(`/api/todos/${data.id}`, {
            handleAs: "json"
        }).then(function () {
            domConstruct.destroy(data.node);
            store.remove(data.id);
        }).catch(function (err) {
            console.log(err);
        });
    });

    // Add a dijit button to clear all todos
    var btnReset = new Button({
        label: "Clear all todos"
    }, "btn-reset");
    btnReset.startup();

    on(btnReset, "click", function () {
        request.del("/api/todos", {
            handleAs: "json"
        }).then(function () {
            domConstruct.empty(list);
            store.setData([]);
        }).catch(function (err) {
            console.log(err);
        });
    });

});