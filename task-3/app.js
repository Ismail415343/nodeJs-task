const fs = require("fs");
console.log(`You are running Node ${process.version}`);

console.log(`Current working directory: ${process.cwd()}`);

const args = process.argv.slice(2);
const name = args[0] || "Guest";

console.log(`Hello ${name} 👋`);