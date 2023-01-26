const express=require("express");

const userRouter=express.Router();

const { body, validationResult } = require('express-validator');

const {createNewUser}=require("../controller/user.controller");
const {loginUser}=require("../controller/user.controller")
const {middleware}=require("../middleware/authMiddleware");

userRouter
    .post("/signup",
    body("email").isEmail(),
    body("password").isLength({min:6}),
    body("username").isLength({min:6}),
    createNewUser)
    .post("/login",middleware,loginUser)
        
module.exports=userRouter;