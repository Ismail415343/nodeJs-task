const fs = require("fs");

const booksFile = "books.json";
const usersFile = "users.json";


function loadData (filePath){
    if(!fs.existsSync(filePath)) {
        return [];
    }
    try{
const data = fs.readFileSync(filePath,"utf8");
return JSON.parse(data)
    } catch(err){
console.error("Error reading file",err);
return [];
    }
}

function saveData(filePath, data){
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function addBooks(title, author, category){
const books = loadData(booksFile);
 const newBooks={
    id: books.length+1,
    title,
    author,
    category,
    available : true,
 }
books.push(newBooks);
saveData(booksFile,books);
console.log(`Book ${title} added successfully!` );


}


function listBook(){
const books = loadData(booksFile);
if(books.length === 0){
    return console.log("No books found");
}
console.table(
    books.map((b)=>({
   
        ID: b.id,
        Title : b.title,
        Author : b.author,
        Category : b.category,
        Status : b.available ? "available " : " borrowed"
    }))
)
}

function addUser(name){
      console.log("addUser function running...");

 const user = loadData(usersFile);
const newUser = {
    id: user.length+1,
    name,
    borrowedBooks:[],
}
 user.push(newUser);
 saveData(usersFile, user);
 console.log(`user ${name} addded successfully`);


}

function borrowBook(userName , booksTitle){
    const users = loadData(usersFile);
    const books = loadData(booksFile);

  const user = users.find((u) => u.name.toLowerCase() === userName.toLowerCase());
  const book =books.find ((b) => b.title.toLowerCase() === booksTitle.toLowerCase());
if(!user) return console.log("user not found");
if(!book) return console.log("books not found");


if(!book.available) return console.log("books is already borrowed");
book.available = false;
user.borrowedBooks.push(book.title)

saveData(booksFile, books);
saveData(usersFile,users);

console.log(`books ${book.title} borrowed by ${user.name}`);


}
function returnBook(userName, bookTitle) {
    const users = loadData(usersFile);
    const books = loadData(booksFile);

    const user = users.find(u => u.name.toLowerCase() === userName.toLowerCase());
    const book = books.find(b => b.title.toLowerCase() === bookTitle.toLowerCase());

    if (!user) return console.log("User not found");
    if (!book) return console.log("Book not found");
    if (!user.borrowedBooks.includes(book.title)) return console.log("This user didn’t borrow that book");

    book.available = true;
    user.borrowedBooks = user.borrowedBooks.filter(b => b !== book.title);

    saveData(booksFile, books);
    saveData(usersFile, users);

    console.log(`Book "${book.title}" returned by ${user.name}`);
}





function showBorrowed(userName, booksTitle){

const users = loadData(usersFile);
const borrowed = users.filter((u) => u.borrowedBooks.length > 0).map((u) => ({
    User: u.name,
    "Borrowed Books": u.borrowedBooks.join(", "),
}))

if(borrowed.length === 0){
    console.log("no books available");
} else{
    console.table(borrowed)
}

}

const [,, command, ...args] = process.argv;

const commands = {
   addBooks : ()=> addBooks (args[0],args[1],args[2]),
   listBook : ()=> listBook(),
   addUser : ()=> addUser(args[0]),
   borrow : ()=> borrowBook(args[0],args[1]),
   returnBook : ()=> returnBook(args[0], args[1]),
   borrowed: () => showBorrowed()
};

if(commands[command]){
commands[command]();
} else {
    console.log(
`   node index.js addBooks "Title" "Author" "Category"
    node index.js listBook
    node index.js addUser "User Name"
    node index.js borrow "User Name" "Book Title"
    node index.js returnBook "User Name" "Book Title"
    node index.js borrowed

`
        
    )
}
