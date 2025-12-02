const express = require('express');
const app = express();
const port = 4000;

app.use(express.json());

let todos = []
let nextId = 1;

app.post('/todo', (req,res)=>{
    const {title, description, status} = req.body;


if(!title){
    return res.status(400).json({error : "title is required"});

}

if(status && status !== 'pending' && status !== 'completed') return res.status(400).json({error : "status must be 'pending' or completed'"})



let newTodos = {
    id: nextId++,
    title,
    description : description || "",
    status : status || "pending"
}
todos.push(newTodos);

res.status(201).json({
    status: 'success',
    todo : newTodos
})

 
})

app.get("/todo", (req, res)=>{
    return res.json({
        status: 'success',
        todos: todos
    })
})

app.get("/todo/:id", (req, res)=>{

const id = Number(req.params.id);
const todo = todos.find(t=> t.id ===id);

if(!todo){
    return res.status(404).json({error : "Todo not found"})
}
return res.json({
    status:"success",
    todo
})



})


app.put("/todo/:id", (req,res)=>{

const id = Number(req.params.id);
const {title, description, status} = req.body;

   const todo = todos.find(t=> t.id === id);
    if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
    }

    if (status && status !== "pending" && status !== "completed") {
        return res.status(400).json({ error: "Status must be 'pending' or 'completed'" });
    }

    if (title) todo.title = title;
    if (description) todo.description = description;
    if (status) todo.status = status;

    return res.json({
        status: "success",
        todo
    });


})

app.delete("/todo/:id", (req,res)=>{
    const id = Number(req.params.id);
    const index = todos.findIndex(p=> p.id === id);

if(index === -1){
    return res.status(404).json({error : "todo not found"})
}
todos.splice(index,1);

return res.json({
    status: "success",
    message: "Todo Deleted"
})



})

app.listen(port,()=>{
     console.log(`Server running on port ${port}`);

})