const userCollection=require("../models/user.model");
const asyncHandler=require("express-async-handler");
const ErrorHandler=require("../utils/ErrorHandler");
const { generateToken } = require("../utils/jwt.utils");


const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body;

    let existingUser=await userCollection.findOne({email});
    if(existingUser) throw new ErrorHandler("Email already exists",400);

    let newUser=await userCollection.create({name,email,password});
    res.status(201).json({
        success:true,
        message:"User Registered Successfully",
        data:newUser,
    });
});

const loginUser=asyncHandler(async(req,res)=>{
    let{email,password}=req.body;

    //! check if email in db
    let existingUser=await userCollection.findOne({ email });
    if(!existingUser) throw new ErrorHandler("please register first",400);


    //! match the password
    let isMatched=await existingUser.comparePassword(password);
    if(!isMatched) throw new ErrorHandler("Invalid credentials",400);

    let token=await generateToken(existingUser._id,existingUser.tokenVersion);
    res.cookie("myCookie",token,{
        maxAge:1*60*60*1000, //maxAge==> in milliseconds (cookie will expire in 1 hr)
        secure:true,
        httpOnly:true,
    });
    res.status(200).json({
        success:true,
        message:"User logged in succesfully",
        token,
    });
});

let logout=asyncHandler(async(req,res)=>{
    res.clearCookie("myCookie");
    // await userCollection.findByIdAndUpdate(
    //      req.myUser._id, //filter
    //     {$inc:{tokenVersion:1}}, //update
    // );

    await userCollection.updateOne({_id:
        req.myUser._id},{$inc:{tokenVersion:1}});
    res.status(200).json({success:true,message:"user logout"});
});

const updateUserProfile=asyncHandler(async(req,res)=>{});  //we can update name,email and phone number


const updateUserPassword=asyncHandler(async(req,res)=>{}); //TODO


const deleteUserProfile=asyncHandler(async(req,res)=>{
    const { _id }=req.myUser; //this we will get from authenticate middleware
}); //delete the profile

const getLoggedInUserProfile=asyncHandler(async(req,res)=>{}); //in the frontend
module.exports={
    registerUser,
    loginUser,
    logout
};