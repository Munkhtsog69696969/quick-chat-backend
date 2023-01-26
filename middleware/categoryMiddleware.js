const jwt=require("jsonwebtoken");

exports.categoryMiddleware=(req,res,next)=>{
    const token=req.headers.authorization ?? null;

    if(!token) return res.send("Authorization token is required!");

    try{
        const payload=jwt.verify(token , "defaultSecret");

        if (!payload) return res.send("Unauthorized");

        if(payload.role=="Admin"){
            next();
        }else{
            res.status(403).send("UnAuthorized");
        }
    }catch(error){
        throw res.send(error)
    }
}