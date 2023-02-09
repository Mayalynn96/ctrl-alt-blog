const express = require('express');
const router = express.Router()
const {User,Post,Comment} = require('../models')
const bcrypt = require('bcrypt');

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
            email:req.body.email
        }
    }).then(userData=>{
        if(!userData){
            res.status(401).json({msg:"Incorrect email or password"})
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


module.exports = router