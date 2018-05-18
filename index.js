var express = require("express"),
    app = express();

var todoRoutes = require("./routes/todos");

// Routes
app.get("/", function (req, res) {
    res.send("Hello from the root route");
});

app.use("/api/todos", todoRoutes);

// Start server
app.listen(3000, "127.0.0.1", function () {
    console.log("Server started on 127.0.0.1:3000");
});