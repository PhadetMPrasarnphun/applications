// var mongoose = require("mongoose");
// mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost:27017/TodoApp");

var express  = require('express')
var bodyParser= require('body-parser')
var {ObjectId} = require("mongodb")

var { mongoose } = require('./db/mongoose')
var { Todo } = require('./models/todo')




var app= express();
const port = process.env.PORT||3000;
app.use(bodyParser.json())

app.post('/todos', (req, res )=> {
    console.log(req.body)

    var todo = new Todo({
        text: req.body.text,
        completed: req.body.completed
    
    })
    todo.save().then((doc)=>{
        res.status(200).send(doc)
    },(err)=>{
        res.status(400).send(doc)
    })

})



app.get('/todos', (req, res)=>{
    Todo.find().then((todos)=>{
        res.send(todos)
    },(err)=>{
        res.status(400).send(err)
    })
})


app.get('/todos/:id', (req, res)=>{
    try {
        console.log(req.params.id)
        var id= req.params.id;
        console.log(id)

        if(!ObjectId.isValid(id)){
            return res.status(404).send()
        }
        //valid id using isValid
        Todo.findById(id).then((todo)=>{
            if(!todo){
                res.status(404).send()
            }
            res.send(todo)
        },(err)=>{
            res.status(400).send(err)
        })
        
    } catch (error) {
        console.log(error)
    }
    
})




app.listen(port, ()=>{
    console.log('started on port : ', port)
})

module.exports = { app }








