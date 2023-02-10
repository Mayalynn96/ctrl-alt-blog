const express = require('express');
const router = express.Router()
const {User,Post,Comment} = require('../models')

router.get("/", (req,res)=>{
 Post.findAll({
    include:[User,Comment]
 }).then(postData=>{
    res.json(postData)
 }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"An error occured",err})
 })
})

router.get("/:id", (req,res)=>{
    Post.findByPk(req.params.id,{
        include:[User, Comment]
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
         title:req.body.title,
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

router.put("/:id",(req,res)=>{
   Post.update({
       post:req.body.post
   },{
       where:{
           id:req.params.id
       }
   }).then(data=>{
       if(data[0]){
           return res.json(data)
       } else {
           return res.status(404).json({msg:"no such record"})
       }
   }).catch(err=>{
       console.log(err);
       res.status(500).json({
           msg:"an error occurred",
           err:err
       })
   })
})

module.exports = router