import express from "express";
import Post from "../models/post.js"
const postRouters = express.Router()
// create a post 
postRouters.post("/", async(req,res)=>{
    const newPost = new Post(req.body)
    try{
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)

    }catch(error){
        res.status(500).json(error)
    }
})


postRouters.put("/:id", async(req,res)=>{
    try{
        const post  = await Post.findById(req.params.id)
        if(post.userId === req.body.userId){
            await Post.updateOne({$set : req.body})
            res.status(200).json("post has been updated ")
        }else{
            res.status(403).json("you can updated only your post")
        }
    }catch(error){
        res.status(500).json(error)
    }
})
postRouters.put("/:id/like", async(req,res)=>{
    try{
        const post  = await Post .findById(req.params.id)
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push : {likes:req.body.userId}})
            res.status(200).json("post has been liked")
        }else{
            await post.updateOne({$pull : {likes:req.body.userId}})
            res.status(200).json("the post has been disliked")
        }
        }catch(error){
            res.status(500).json(error)
    }
})


// get a post 
postRouters.get("/:id",async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post)
    }catch(err){
        res.status(500).json(err)
    }
})

// get time line of post 
postRouters.get("/timeline/all",async(req,res)=>{
    try{
        const currentUser = await User.findById(req.body.userId)
        const userPosts = await Post.find({userId:currentUser._id})
        const friendPosts = await Promise.all(
            currentUser.followings.map(frinedId=>{
               return Post.find({userId:frinedId})
            })
        )
        res.json(userPosts.concat(...friendPosts))
    }catch(err){
        res.status(500).json(err)
    }
})
export default  postRouters
// update a post 


// delete a post 
// get a post 
// get a time line post 