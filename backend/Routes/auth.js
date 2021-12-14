const express = require('express');

const bcrypt=require('bcryptjs')
const User = require('../model/User')

const jwt = require('jsonwebtoken');

const JWT_SECRET= 'harryisagoodboy';
const router = express.Router();
const { body, validationResult } = require('express-validator');


router.post('/createuser' ,[
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
    
], 
   async (req,res)=>{
       //if there are errors return bad request and errors

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        //check whether the user this email already exists
try{

    let user = await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({error:"Sorry a user with this email already exists"})
    }
    const salt = await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt)
    //create a new user
    
    user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email
    });

    const data = {
        user: {
            id:user.id
        }
    }

    const authtoken = jwt.sign(data,JWT_SECRET);
    
    
    
        res.json({authtoken})
    }catch(error){
        console.log(error.message);
        res.status(500).send("error occured")
    }
   
})
module.exports = router