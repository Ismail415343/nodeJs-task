const fs = require("fs");
const filePath = "notes.json";


function loadNotes (){
    if(!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath,"utf-8");
    return JSON.parse(data);
}
function saveNotes(notes){
fs.writeFileSync(filePath,JSON.stringify(notes,null,2));
}
const args = process.argv.slice(2);
const command = args[0];


const commands = {




    add(){
  const [title, ...bodyParts] = args.slice(1);
   const body = bodyParts.join(" ");
   if(!title || !body){
 console.log("usage: node notes.js add <title> <body>");
 return;
  }

   const notes = loadNotes();
   const titleExists = notes.find(n=> n.title.toLowerCase() === title.toLowerCase());

   if(titleExists){
    console.log(`Notes '${title}' already exists !`);
    return
   }
  notes.push({ title,body })
  saveNotes(notes);
  console.log(`Node '${title}' added successfully`)


    },


  list(){
    const notes = loadNotes();
    if(notes.length===0){
        console.log("no notes found");
        return;
    }
       console.log("\n Your Notes:");
    console.table(notes.map(note => ({
      Title: note.title,
      Body: note.body
    })));
  },






read(){
    const title = args[1];
    if(!title){
        console.log("Usage: node notes.js read <title>");
        return;

    }

const notes = loadNotes();
const note = notes.find(n=>n.title.toLowerCase()=== title.toLowerCase());

if(note){
    console.log(`\n ${note.title} \n ${note.body}`)
} else{
    console.log(`No note found with ${title}`);
}

},

remove(){
    const title = args[1];
if(!title){
console.log("Usage: node notes.js remove <title>");
return;
}
  const notes = loadNotes();
    const filtered = notes.filter(
      n => n.title.toLowerCase() !== title.toLowerCase()
    );

    if (filtered.length === notes.length) {
      console.log(` No note found with title '${title}'.`);
      return;
    }

    saveNotes(filtered);
    console.log(` Note '${title}' removed successfully.`);
  }
};

if(commands[command]){
    commands[command] ();
} else{
    console.log(`
        
        Usage : 
        node notes.js add "Title" "Body"
        node notes.js list
        node notes.js read "Title"
        node notes.js remove "Title"
        
        
        `)
}
