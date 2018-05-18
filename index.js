const express = require("express"),
    mongoose = require('mongoose'),
    app = express();


//Set up default mongoose connection
mongoose.connect('mongodb://localhost:27017/todos-spa');
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

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