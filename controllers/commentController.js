const express = require('express');
const router = express.Router()
const {User,Post,Comment} = require('../models')

router.get("/", (req,res)=>{
 Comment.findAll().then(postData=>{
    res.json(postData)
 }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"An error occured",err})
 })
})

module.exports = router