import express from "express"
import bcrypt from "bcrypt"
import User from "../models/user.js"

const UserRouters = express.Router()

UserRouters.put("/:id", async(req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password,salt)

            }catch(error){
                return res.status(500).json(error)
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                    $set : req.body,
                })
                res.status(200).json("Account has been updated")
        }catch(error){
            return res.status(500).json(error)
        }
    }else{
        return res.status(403).json("you can update only your account")
    }
})

UserRouters.delete("/:id", async(req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try{
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted")
        }catch(error){
            return res.status(500).json(error)
        }
    }else{
        return res.status(403).json("you can delete only your account")
        
    }
})
// get a user
UserRouters.get("/:id", async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        const {password,updateAt, ...other} = user._doc
        res.status(200).json(other)
    }catch(error){
        res.status(500).json(error)
    }
})

// follow the user 




UserRouters.put("/:id/follow", async(req,res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id)
            const currentUser = await  User.findById(req.body.userId)
            if(!user.follwers.includes(req.body.userId)){
                await user.updateOne({ $push :{ followers : req.body.userId}})
                await currentUser.updateOne({ $push :{followings: req.params.id}})
                res.status(200).json("User has been followed")
            }else{
                res.status(403).json("you already follow this user")
            }

        }catch(error){
            res.status(500).json(error)
        }

    }else{
        res.status(403).json("you can follow your self")
    }
})

export default UserRouters
// update user
// get all users
// follow a user
// un follow the use
