const express = require('express');
const app = express();

const PORT = 3000;

app.get("/welcome", (req,res)=>{
    res.json({message: "welcome to your first api"})
});


app.get("/greet", (req,res)=>{
    const name = req.query.name;
if(name){
res.json({message: `Hello ${name}`})
return;
}
res.json({message: "hello guest"})

})

app.get("/student/:name", (req,res)=>{
    const student = req.params.name;
  res.json({
    student,
    status: 'Record fetched successfully'
  });

})

app.listen(PORT, ()=>{
console.log(`serverr running successfully on the port ${PORT}`)
}); 
 
