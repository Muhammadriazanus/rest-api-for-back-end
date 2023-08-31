import express from "express";
import post from "../models/post.js"
const postRouters = express.Router()
// create a post 
postRouters.post("/", async(req,res)=>{
    const newPost = new post(req.body)
    try{
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)

    }catch(error){
        res.status(500).json(error)
    }
})


postRouters.put("/:id", async(req,res)=>{
    try{
        const post  = await post.findById(req.params.id)
        if(post.userId === req.body.userId){
            await post.updateOne({$set : req.body})
            res.status(200).json("post has been updated ")
        }else{
            res.status(403).json("you can updated only your post")
        }
    }catch(error){
        res.status(500).json(error)
    }
})
export default  postRouters
// update a post 
// delete a post 
// get a post 
// get a time line post 