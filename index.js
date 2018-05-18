var express = require("express"),
    bodyParser = require("body-parser"),
    app = express();

var todoRoutes = require("./routes/todos");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/api/todos", todoRoutes);

// Routes
app.get("/", function (req, res) {
    res.send("Hello from the root route");
});

// Start server
app.listen(3000, "127.0.0.1", function () {
    console.log("Server started on 127.0.0.1:3000");
});