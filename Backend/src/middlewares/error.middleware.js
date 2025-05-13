const { JsonWebTokenError } = require("jsonwebtoken");

const error=(err,req,res,next)=>{
    //! validation error
    if(err.name=="ValidationError"){
        err.statusCode=400;
        err.message=Object.values(err.errors).map((ele)=>ele.message);
    }

    if(err.name==="JsonWebTokenError"){
        err.statusCode=401;
        err.message="please log in again";
    }
    //! global error handler

    err.message=err.message || "Internal Server Error";
    err.statusCode=err.statusCode || 500;
    res.status(err.statusCode).json({
        success:false,
        message:err.message,
        // errObj:err,
    });
};
module.exports=error;