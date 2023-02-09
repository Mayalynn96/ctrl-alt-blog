const express = require('express');
const router = express.Router()
const {User,Post,Comment} = require('../models')
const bcrypt = require('bcrypt');
const { Op } = require("sequelize");

router.get("/", (req,res)=>{
 User.findAll().then(userData=>{
    res.json(userData)
 }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"An error occured",err})
 })
})

router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("/")
})

router.get("/:id", (req,res)=>{
    User.findByPk(req.params.id,{
        include:[Post]
    }).then(userData=>{
       res.json(userData)
    }).catch(err=>{
       console.log(err);
       res.status(500).json({msg:"An error occured",err})
    })
})

router.post("/", (req,res)=>{
    User.create({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    }).then(userData=>{
        req.session.userId = userData.id;
        req.session.userEmail = userData.email;
       res.json(userData)
    }).catch(err=>{
       console.log(err);
       res.status(500).json({msg:"An error occured",err})
    })
})

router.post("/login", (req,res)=>{
    User.findOne({
        where:{
            [Op.or]: [{ username: req.body.login }, [{ email: req.body.login }]]
        }
    }).then(userData=>{
        if(!userData){
            res.status(401).json({msg:"Incorrect login or password"})
        } else {
            if(bcrypt.compareSync(req.body.password,userData.password)){
                req.session.userId = userData.id
                req.session.userEmail = userData.email
                return res.json(userData)
            } else {
                res.status(401).json({msg:"Incorrect email or password"})
            }
        }
    }).catch(err=>{
       console.log(err);
       res.status(500).json({msg:"An error occured",err})
    })
})

router.delete("/:id", (req,res)=>{
    if(req.session.userId){
       User.findByPk(req.params.id).then(userData=>{
         if(!userData){
          res.status(404).json({msg:"No such user!"})
         } else if(userData.id===req.session.userId){
          User.destroy({where: {
             id:req.params.id
          }})
          res.send("User deleted!")
         } else {
          res.status(403).json({msg:"You can not delete another user!"})
         }
      }).catch(err=>{
         console.log(err);
         res.status(500).json({msg:"An error occured",err})
      })
    } else {
       res.status(403).json({msg:"login to delete a user!"})
    }
 })

module.exports = router