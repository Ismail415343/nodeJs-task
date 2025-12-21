const { message } = require("statuses");
const User = require("../models/User");
const { use } = require("react");

exports.registerUser = async (req,res)=>{
    try{
        const {name, email, password, role} = req.body;

        if(name.length < 3){
            return res.status(400).json({error: "name must be at least 3 characters"})
        }

        if(password.length < 6){
            return res.status(400).json({error: "password must be atleast 6 characters"})

        }
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message: "user already exists "})
        }

        const user = await User.create({
            name,
            email,
            password,
            role
        })

        res.status(201).json({
      message: "User registered successfully",
      user
    });


    } catch(err){
         return res.status(500).json({message: error.message});
    }
};

exports.loginUser = async (req,res)=>{
    try{

        const{email, password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(403).json({message: "User not found"})
        }

        if(user.isActive == false){
           return res.status(403).json({ message: "User is blocked" });

        }
           
        if(user.password !== password){
            return res.status(401).json({message: "invalid password"})
        }

        res.json({
        message: " login successfully",
        user:{
        name: user.name,
        email: user.email,
        role: user.role
     }
    })


    } catch(err){
 
        res.status(500).json({message: err.message})
    }
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.json({
      message: "User status updated",
      user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "admin") {
      return res.status(403).json({ message: "Admin cannot be deleted" });
    }

    await user.deleteOne();

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};