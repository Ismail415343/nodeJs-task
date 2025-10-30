console.log('Student Manager Running...');

const fs = require("fs");
const filePath = "students.json";

function loadStudents() {
  if (!fs.existsSync(filePath)) return [];
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading file:", err);
    return [];
  }
}

function saveStudents(students) {
  fs.writeFileSync(filePath, JSON.stringify(students, null, 2), "utf8");
}

const args = process.argv.slice(2);
const command = args[0];

switch (command) {

  case "add": {
    const [name, age, city] = args.slice(1);
    if (!name || !age || !city) {
      console.log("Usage: node studentManager.js add <name> <age> <city>");
      process.exit(1);
    }

    const students = loadStudents();
    
    if (students.some(s => s.name.toLowerCase() === name.toLowerCase())) {
      console.log(`Student '${name}' already exists!`);
      process.exit(1);
    }

    students.push({ name, age: Number(age), city });
    saveStudents(students);
    console.log(`✅ Student '${name}' added successfully.`);
    break;
  }

  
  case "list": {
    const students = loadStudents();
    if (students.length === 0) {
      console.log("No students found.");
    } else {
      console.table(students);
    }
    break;
  }

  case "search": {
    const name = args[1];
    if (!name) {
      console.log("Usage: node index.js search <name>");
      process.exit(1);
    }

    const students = loadStudents();
    const found = students.find(s => s.name.toLowerCase() === name.toLowerCase());

    if (found) console.table([found]);
    else console.log(`❌ Student '${name}' not found.`);
    break;
  }

  case "remove": {
    const name = args[1];
    if (!name) {
      console.log("Usage: node index.js remove <name>");
      process.exit(1);
    }

    const students = loadStudents();
    const filtered = students.filter(
      s => s.name.toLowerCase() !== name.toLowerCase()
    );

    if (filtered.length === students.length) {
      console.log(`❌ No student found with name '${name}'.`);
    } else {
      saveStudents(filtered);
      console.log(`🗑️ Student '${name}' removed successfully.`);
    }
    break;
  }

  default:
    console.log(`
Usage:
  node studentManager.js add "Name" Age "City"
  node studentManager.js list
  node studentManager.js search "Name"
  node istudentManager.js remove "Name"
`);
}
