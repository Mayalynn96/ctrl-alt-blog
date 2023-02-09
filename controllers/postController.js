const express = require('express');
const router = express.Router()
const {User,Post,Comment} = require('../models')

router.get("/", (req,res)=>{
 Post.findAll().then(postData=>{
    res.json(postData)
 }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"An error occured",err})
 })
})

router.get("/:id", (req,res)=>{
    Post.findByPk(req.params.id,{
        include:[User]
    }).then(postData=>{
       res.json(postData)
    }).catch(err=>{
       console.log(err);
       res.status(500).json({msg:"An error occured",err})
    })
})

router.post("/", (req,res)=>{
   if(req.session.userId){
      Post.create({
         post:req.body.post,
         UserId:req.session.userId
     }).then(postData=>{
        res.json(postData)
     }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"An error occured",err})
     })
  } else {
      res.status(403).json({msg:"login to add a post!"})
  }
})

router.delete("/:id", (req,res)=>{
   if(req.session.userId){
      Post.findByPk(req.params.id,{
         include:[User]
     }).then(postData=>{
        if(!postData){
         res.status(404).json({msg:"No such post!"})
        } else if(postData.UserId===req.session.userId){
         Post.destroy({where: {
            id:req.params.id
         }})
         res.send("Post deleted!")
        } else {
         res.status(403).json({msg:"You can not delete another users post!"})
        }
     }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"An error occured",err})
     })
   } else {
      res.status(403).json({msg:"login to delete a post!"})
   }
})

module.exports = router