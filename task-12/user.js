const strict = require("assert/strict")
const { create } = require("domain")
const mongoose = require("mongoose")

const userSchema = new mongoose.userSchema({
    name: {
        type: String,
        required: true,
        minimunLength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true 
    }, 
    password: {

        type: String,
        required: true,
        minimunLength: 6
    },
    role: {

        type: String,
        enum:["user", "admin"],
        default: "user"
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
      
        type: date,
        default: Date.now
    }
});

module.exports = mongoose.model("user", userSchema)