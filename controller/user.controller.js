const User=require("../models/user.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const { body, validationResult } = require('express-validator');

require("dotenv").config();

exports.createNewUser=async(req,res)=>{
    const errors = validationResult(req);

    const username=req.body.username;

    const email=req.body.email;

    const password=req.body.password;

    const existingUser=await User.findOne({email});

    if(existingUser && existingUser!==""){
        res.send("Email already in use.");
    }else{
        if(errors.isEmpty()){
            const salt=bcrypt.genSaltSync(10);

            const hash=bcrypt.hashSync(password , salt);

            const newUser=await User.create({username:username , email:email , password:hash});
    
            newUser.save();
    
            res.send(newUser);
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


exports.loginUser=async(req,res)=>{
    const email=req.body.email;

    const password=req.body.password;

    const existingUser=await User.findOne({email});

    if(existingUser && existingUser!=""){
        const matched=await bcrypt.compareSync(password , existingUser.password);

        if(matched && matched){
            const accessToken=jwt.sign(
                {email:email , id:existingUser._id},
                process.env.SECRET_TOKEN || "defaultSecret",
                {expiresIn:"1h"},
            )
            // if(accessToken && accessToken){
            //     req.headers.authorization=accessToken
            // }
            // res.send(req.headers)

            if(accessToken && accessToken){
                res.send(accessToken);
            }
        }else{
            res.send("Wrong username or password.")
        }
    }else{
        res.send("User doesnt exist.");
    }
}
