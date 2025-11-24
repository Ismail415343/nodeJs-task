const express = require("express");
const app = express();
const port =2000;


app.get("/calculator", (req, res) =>{
    let {number1, number2, operation} = req.query;

if(!number1 || !number2 || !operation){ 
   return res.status(400).json({error: "number 1, number 2, operation required"})
    }



number1 = Number(number1);
number2 = Number(number2);


if(isNaN(number1 ) || isNaN(number2)){
    return res.status(400).json({error: "number 1 and number 2 must be valid"})
}


let result; 
switch(operation){
    case "add": 
    result = number1 + number2;
    break;



    case "sub": 
    result = number1 - number2;
    break;
   
    case "mul":
        result = number1 *number2;
        break;


        case "div":
            
        if(number2 === 0 ){
            return res.status(400).json({error: " cannot divisible by 0"})
        }
        result = number1/number2;
        break;

        default:
        return res.status(400).json({error : "Invalid operation. Use add, sub, mul or div"})


}


res.json({
    number1,
    number2,
    operation: operation,
    result
})

}) 

app.listen(port, ()=>{
    console.log(`Calculator API running at http://localhost:${port}`)
})