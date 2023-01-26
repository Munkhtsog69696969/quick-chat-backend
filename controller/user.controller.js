const User=require("../models/user.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const {tokenGenerator}=require("../tokenGenerator")

const { body, validationResult } = require('express-validator');

require("dotenv").config();

exports.createNewUser=async(req,res)=>{
    const errors = validationResult(req);

    const username=req.body.username;

    const email=req.body.email;

    const password=req.body.password;

    const role=req.body.role;

    const existingUser=await User.findOne({email});

    if(existingUser && existingUser!==""){
        res.send("Email already in use.");
    }else{
        if(errors.isEmpty()){
            const salt=bcrypt.genSaltSync(10);

            const hash=bcrypt.hashSync(password , salt);

            const newUser=await User.create({username:username , email:email , password:hash , role:role});
    
            newUser.save();
    
            // res.send(newUser);

            const accessToken=tokenGenerator({email:email , role:role});
            
            if(accessToken && accessToken){
                // req.headers.authorization=accessToken;
                // res.send(req.headers);
                res.send(accessToken)
            }

        } else{
           if(errors.errors[0].param=="email"){
            res.send("Invalid email.");
           }
    
           if(errors.errors[0].param=="password"){
            res.send("Invalid password , password must be longer than 6 letters.");
           }
    
           if(errors.errors[0].param=="username"){
            res.send("Invalid username , username must be longer than 6 letters.");
           }
        }
    }
}


exports.loginUser=async(req,res,next)=>{
    const email=req.body.email;

    const password=req.body.password;

    const existingUser=await User.findOne({email});

    if(existingUser && existingUser!=""){
        const matched=await bcrypt.compareSync(password , existingUser.password);

        if(matched && matched){
            // const accessToken=tokenGenerator({email:existingUser.email , id:existingUser._id});

            // if(accessToken && accessToken){
            //     req.headers.authorization=accessToken;
            //     res.send(req.headers);
            // }
            res.send(existingUser)
        }else{
            res.send("Wrong email or password.")
        }
    }else{
        res.send("User doesnt exist.");
    }
}