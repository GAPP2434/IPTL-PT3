const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

//Register a new user (Optional for initial setup)
router.post("/register", async (req, res) => {
    const {name, email, password} = req.body;
    const hashedPassword = await bycrpt.hash(password, 10);

    try{
        const newUser = new User({name, email, password: hashedPassword});
        await newUser.save();
        res.json({message: "User registered successfully"});
    } catch(error){
        res.status(500).json({error: error.message});
    }
});

//Login user
router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;
        
        // Find user by email
        const user = await User.findOne({ email });
        
        // Check if user exists and password matches
        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(400).json({error: "Invalid credentials"});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});

        res.cookie("token", token, {httpOnly: true}).json({
            message: "Login successful",
            user: { name: user.name, email: user.email }
        });
    } catch (error) {
        res.status(500).json({error: "Login failed"});
    }
});

//Get all users (for dashboard)
router.get("/users", async (req, res) => {
    const users = await User.find({}, {password: 0});
    res.json(users);
});

//Logout user
router.post("/logout", (req, res) => {
    res.clearCookie("token").json({message: "Logout successful"});
});

module.exports = router;