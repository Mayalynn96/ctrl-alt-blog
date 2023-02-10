const express = require('express');
const router = express.Router()
const {User,Post,Comment} = require('../models')

router.get("/", (req,res)=>{
 Comment.findAll({
    include:[User,Post]
 }).then(postData=>{
    res.json(postData)
 }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"An error occured",err})
 })
})

router.get("/:id", (req,res)=>{
    Comment.findByPk(req.params.id,{
        include:[User,Post]
    }).then(commentData=>{
       res.json(commentData)
    }).catch(err=>{
       console.log(err);
       res.status(500).json({msg:"An error occured",err})
    })
})

router.get("/bypost/:id", (req,res)=>{
   Post.findByPk(req.params.id,{
      include:[{
         model:Comment,
         include:{
             model:User
         }
     }]
   }).then(commentData=>{
      res.json(commentData)
   }).catch(err=>{
      console.log(err);
      res.status(500).json({msg:"An error occured",err})
   })
})

router.post("/", (req,res)=>{
   if(req.session.userId){
      Comment.create({
         PostId:req.body.PostId,
         comment:req.body.comment,
         UserId:req.session.userId
     }).then(commentData=>{
        res.json(commentData)
     }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"An error occured",err})
     })
  } else {
      res.status(403).json({msg:"login to add a comment!"})
  }
})

router.delete("/:id", (req,res)=>{
   if(req.session.userId){
      Comment.findByPk(req.params.id,{
         include:[User]
     }).then(commentData=>{
        if(!commentData){
         res.status(404).json({msg:"No such comment!"})
        } else if(commentData.UserId===req.session.userId){
         Comment.destroy({where: {
            id:req.params.id
         }})
         res.send("Comment deleted!")
        } else {
         res.status(403).json({msg:"You can not delete another users comment!"})
        }
     }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"An error occured",err})
     })
   } else {
      res.status(403).json({msg:"login to delete a comment!"})
   }
})


module.exports = router