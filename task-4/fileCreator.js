/*const fs = require("fs");

const args = process.argv.slice(2);
const fileName = args[0];
const content = args.slice(1).join(" ");

fs.writeFileSync(" message.txt","hello aorld");

const result = fs.readFile('contact.txt',"utf-8" ,(err, result) =>{
    if (err){
        console.log(err+ " error occured")
        return;
    }
    console.log(result);
} );*/


// task 4 

const fs = require("fs");

const args = process.argv.slice(2);
const fileName = args[0];
const content = args.slice(1).join(' ');

if(!fileName || !content){
  console.log("Usage: node fileCreator.js <fileName> <content>");
//   process.exit(1);    
return;
}

fs.writeFileSync(fileName, content);
console.log(`file ${fileName} created sucessfully`);

const result = fs.readFileSync(fileName,"utf-8", (err, result)=>{
    if(err){
        console.log(err+" error occured");
    } else{
         console.log(`file contect ${content}`);
    }
});
