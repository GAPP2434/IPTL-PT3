const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Add this middleware function at the top of auth.js
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "Access denied. Please login first." });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = verified.id;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token. Please login again." });
    }
};


//Register a new user (Optional for initial setup)
router.post("/register", async (req, res) => {
    const {name, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

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
        
        const user = await User.findOne({ email });
        
        if(!user) {
            return res.status(400).json({error: "User not found"});
        }
        
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) {
            return res.status(400).json({error: "Invalid password"});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 3600000,
            path: '/'
        }).json({
            message: "Login successful",
            user: { name: user.name, email: user.email }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({error: "Login failed. Please try again."});
    }
});

//Get all users (for dashboard)
router.get("/users", verifyToken, async (req, res) => {
    try {
        const users = await User.find({}, {password: 0});
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

//Logout user
router.post("/logout", (req, res) => {
    res.clearCookie("token").json({message: "Logout successful"});
});

module.exports = router;