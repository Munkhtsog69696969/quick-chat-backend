const express=require("express");

const categoryRouter=express.Router();
const {categoryMiddleware}=require("../middleware/categoryMiddleware");
const {createCategory}=require("../controller/category.controller")

categoryRouter
    .post("/category",categoryMiddleware,createCategory)
module.exports=categoryRouter;