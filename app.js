const express = require("express");
const mongoose = require("mongoose");

// create server
const server = express();

const cors = require("cors");
server.use(cors());

// configure to get the json in the body
server.use(express.json());

mongoose.connect("mongodb://localhost:27017/familyTasks" , {useNewUrlParser:true} , (err , mongoClient)=>{
if(err) return console.log(err);
console.log("we're connected to " + mongoClient.name + "database on mongoDB");
});

// create schema of forign Category:
const familySchema = mongoose.Schema({
    name:String,
    discription:String,
});

const Family = mongoose.model("Family" , familySchema , "familyMembers" );

// create schema of family:
const TaskSchema =mongoose.Schema({
    task:String,
    date:String,
    familyMember:{type:mongoose.Schema.Types.ObjectId , ref:"Family"}, // forign key
})

const Task = mongoose.model("Task" , TaskSchema , "tasks");

// Get ALL family members
server.get("/api/familyMembers" , (request,response)=>{
    Family.find({} ,(err,family)=>{
        if(err) return response.status(500).json(err);
        response.json(family);
    });
});

// Get ALL tasks
server.get("/api/tasks", (request, response)=>{
    Task.find({}).populate("familyMember").exec((err,tasks)=>{
        if(err) return response.status(500).json(err);
        response.json(tasks);
    });
});


// // Get one tasks
server.get("/api/tasks/:_id" , (request , response)=>{
    Task.findOne({_id:request.params._id}).populate("familyMember").exec((err , tasks)=>{
        if(err) return response.status(500).json(err);
        response.status(201).json(tasks);
    });
});

// post - add tasks
server.post("/api/tasks" , (request , response)=>{
const task = new Task(request.body);
task.save((err , task)=>{
    if(err) return response.status(500).json(err);
        response.status(200).json(task)
});
});

// put - update tasks
server.put("/api/tasks/:_id" , (request , response)=>{
    const task = new Task(request.body);
    task._id = request.params._id;
    task.updateOne({_id:request.params._id} , task , (err , task)=>{
        if(err) return response.status(500).json(err);
            response.status(200).json(task)
    });
    });


    // patch - update partial tasks
server.patch("/api/tasks/:_id" , (request , response)=>{
    const task = new Task(request.body);
    task._id = request.params._id;
    task.updateOne({_id:request.params._id} , task , (err , player)=>{
        if(err) return response.status(500).json(err);
            response.status(200).json(task)
    });
    });

    //delete tasks
    server.delete("/api/tasks/:_id" , (request , response)=>{
        Task.deleteOne({_id:request.params._id}, (err , task)=>{
            if(err) return response.status(500).json(err);
            response.status(204).json();
        });
    });

    server.listen(3000, ()=>{
        console.log("listen on http://localhost:3000");
    });