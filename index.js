const express = require("express"),
    app = express();

// Routes
app.get("/", function (req, res) {
    res.json({
        message: "Hi from JSON"
    });
});

// Start server
app.listen(3000, "127.0.0.1", function () {
    console.log("Server started on 127.0.0.1:3000");
});