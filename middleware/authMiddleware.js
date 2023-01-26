const express=require("express");

const jwt=require("jsonwebtoken");

exports.middleware=(req,res,next)=>{
    const token=req.headers.authorization ?? null;

    if(!token) return res.send("Authorization token is required!");

    try{
        const payload=jwt.verify(token , process.env.SECRET_TOKEN || "defaultSecret");

        // res.send(payload && payload)
        if (!payload) return res.send("Unauthorized");

        next();
    }catch(error){
        throw res.send(error)
    }

}