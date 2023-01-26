const Category=require("../models/category.model");

exports.createCategory=async(req,res)=>{
    const name=req.body.name;

    const newCategory=await Category.create({name:name});

    newCategory.save();

    res.send(newCategory);
}