const mongoose = require("mongoose");

const connectDb = async()=>{
try{
    await mongoose.connect("mongodb://127.0.0.1:27017/userAuthDB")
    console.log("MongoDB connect")
} catch(err){
console.log("connection failed", err);
process.exit(1)
}

}

module.exports = connectDb