const mongoose = require("mongoose");

// Activates debug mode
mongoose.set("debug", true);
//Set up default mongoose connection
mongoose.connect('mongodb://localhost:27017/todos-spa');
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;


// //Get the default connection
// const db = mongoose.connection;
// //Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports.Todo = require("./todo");