const asyncHandler=require("express-async-handler");
const  jwt=require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const userCollection=require("../models/user.model");
const authenticate=asyncHandler(async(req,res,next)=>{
    // console.log(req.cookies);
   let token =  req?.cookies?.myCookie;
   if(!token) throw new ErrorHandler("please login first",401)

    let decodedToken=jwt.verify(token,"secret-key");
    // console.log(decodedToken);
    let user=await userCollection.findById(decodedToken.id);
    if(!user) throw new ErrorHandler("Invalid session,please login again!!!",404);

    if(user.tokenVersion !== decodedToken.tokenVersion){
        throw new ErrorHandler("invalid session,please login again !!!",404);
    }
    req.myUser=user;
    next();
});
module.exports={ authenticate };


//! blacklisting =>
    //! tokenVersion