const {Schema,Types,model}=require("mongoose");

const categorySchema=new Schema({
    name:{
        type:String,
        required:true,
    }
});

const Category=model("categories",categorySchema);

module.exports=Category;