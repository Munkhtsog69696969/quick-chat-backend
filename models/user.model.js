const {Schema,Types,model}=require("mongoose");

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        required:true,
    },

    password:{
        type:String,
        required:true,
    },

    role:{
        type:Object,
        default:"User",
    }

});

const User=model("users",userSchema);

module.exports=User;