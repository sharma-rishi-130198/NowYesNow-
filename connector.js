var express = require('express');
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
var cors = require('cors');

var server = express();

mongoose.connect("mongodb://localhost:27017/todo", function(err){
    if(err){
        console.log("Error connecting to database");
    }else{
        console.log("Connected to database");
    }

});
// express server to listen to port 3000
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(cors());

server.listen(3000, function () {
    console.log('Server is running..');
});
// express server to call createTask function
server.post('/createTask', function (req, res) {
    console.log('getting sent data=',req.body);
    //createTask(req.body.taskName, req.body.taskDescription, req.body.startDate, req.body.endDate);
    createTask(req.body.taskName);
        // "hi", "2023-05-25T16:34", "2023-06-25T16:34");
    res.send('{"result":"sent"}');
});

// Defining task schema
const taskSchema = new mongoose.Schema({
    taskName: String,
    taskDescription: String,
    startDate : Date,
    endDate : Date,
    state : { type: Boolean, default: false },
    updated : { type: Date, default: Date.now }     //metadata
});

// Creating collection
const tasks = mongoose.model("task", taskSchema);

// const task1 = new tasks({
//     taskName: "Do grocery",
//     taskDescription: "Buy milk, bread, eggs, and fruits",
//     startDate : new Date("2023-05-25T12:34"),
//     endDate : new Date("2023-05-28T12:34"),
// });

// task1.save();

// give console output of done
// console.log("saved to database");

// function to create new task
function createTask(taskName, taskDescription=null, startDate=null, endDate=null) {
    const task = new tasks({
        taskName: taskName,
        taskDescription: taskDescription,
        startDate : startDate,
        endDate : endDate,
    });
    task.save();
    console.log("saved to database");
}


// function to delete task from mongoose mongodb
function deleteTask(task) {
    // await tasks.deleteOne({ taskName: task }, function (err) {
    //     if (err) return handleError(err);
    //     // deleted at most one tank document
    //  });

// Using callbacks:
     tasks.deleteOne({ taskName: task }, function (err) {
            if (err)
                console.log('error')
            else
                console.log("Successfully deleted")
         });
}
// express server to call deleteTask function
server.post('/deleteTask', function (req, res) {
    console.log('getting sent data to be deleted=',req.body);
    deleteTask(req.body.taskName);
    res.send('{"result":"sent"}');
});

// call createTask function
// createTask("Get milk ", "Buy organic", new Date("2023-05-25T12:34"), new Date("2023-05-29T12:34"));


// function to update task
// findOneAndUpdate()
//function updateTask(taskName, taskDescription, startDate, endDate) {

