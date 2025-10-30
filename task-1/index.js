console.log('hello world')

const fs = require("fs");


const filePath = "students.json";


function loadStudent(){
    if(!fs.existsSync(filePath)){
        return [];
    }
const data =fs.readFileSync(filePath, "utf8")
try{
    return JSON.parse(data);
} catch(e){
    return [];
}
}

function saveStudents(students){
    fs.writeFileSync(filePath,JSON.stringify(students,null,2) , "utf8")
}

const args = process.argv.slice(2);
const command =args[0];

if(command === "add"){
const [name, age, city] = args.slice(1);
if(!name || !age, !city){
console.log("Usage: node index.js add <name> <age> <city>");
process.exit(1);
}
const students = loadStudent();
students.push({name, age : Number(age), city})
saveStudents(students)
console.log (`student '${name}' added successfully.`)

}
else if(command === 'list'){
    const students = loadStudent();
    console.table(students)
}
else if(command === "search"){
    const name  = args[1];
    if(!name){
        console.log("usage: node index.js search <name>");
        process.exit(1);
 
    }
    const students = loadStudent();
    const found= students.find(s => s.name.toLowerCase()=== name.toLowerCase());
    if(found) console.table([found])

else  console.log(`student ${name} not found`)

}

else if(command == "remove") {
    const name = args[1];
    if(!name){
        console.log(`Usage: node index.js remove <name>`);
        process.exit(1);
    }
const students = loadStudent();
const newStudents = students.filter(s=> s.name.toLowerCase() !== name.toLowerCase());
saveStudents(newStudents);
console.log(`student '${name}' removed (if existed).`)

} else {
    console.log(`

Usage:
  node index.js add "Name" Age "City"
  node index.js list
  node index.js search "Name"
  node index.js remove "Name"



        `)
}
