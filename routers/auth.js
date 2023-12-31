import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import user from "../models/user.js";

const authRouters = express.Router()

authRouters.post("/registor", async (req, res) => {

    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        // save user and return response
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        const user = await newUser.save()
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err);
    }
})
// lo
authRouters.post("/login", async (req, res) => {
    try {
        const user = await user.findOne({ email: req.body.email });
        !user && res.status(404).json("user is not found")
        
        const validPassword  = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("wrong password")
        res.status(200).json(user)
    }catch(err){
        res.status(500).json(err)
    }
    
})
export default authRouters