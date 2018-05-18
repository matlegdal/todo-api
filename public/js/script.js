require([
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/query",
    "dojo/request",
    "dojo/_base/array",
    "dojo/NodeList-dom",
    "dojo/domReady!"
], function (dom, domConstruct, query, request, dojoArray) {
    request.get("/api/todos", {
            handleAs: "json"
        })
        .then(function addTodos(todos) {
            var list = query(".list")[0];
            dojoArray.forEach(todos, function (todo) {
                var className = "task";
                if (todo.completed) {
                    className += " done";
                }
                domConstruct.create("li", {
                    innerHTML: todo.name,
                    className: className
                }, list);
            });
        })
        .catch(function (err) {
            console.log(err);
        });
});