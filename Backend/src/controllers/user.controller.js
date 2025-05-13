const userCollection=require("../models/user.model");
const asyncHandler=require("express-async-handler");
const ErrorHandler=require("../utils/ErrorHandler");
const { generateToken } = require("../utils/jwt.utils");


const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password,phoneNumber}=req.body;

    let existingUser=await userCollection.findOne({email});
    if(existingUser) throw new ErrorHandler("Email already exists",400);

    let newUser=await userCollection.create({name,email,password,phoneNumber});
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

const updateUserProfile=asyncHandler(async(req,res)=>{
    const{_id}=req.myUser; // logged in user
const {name,email,phoneNumber}=req.body;

const updatedUser=await userCollection.findByIdAndUpdate(
    {_id}, //filter
    {$set:{name,email,phoneNumber}}, //updation
    {new:true}, // it return ths updated document=>options
);
res.status(200).json({
    success:true,
    message:"user updated Succesfully",
    data:updatedUser,
})});  //we can update name,email and phone number


const updateUserPassword=asyncHandler(async(req,res)=>{
    let{newPassword}=req.body;
    let user=await userCollection.findById(req.myUser._id); //authenticate middleware
    user.password=newPassword; //assigning the value
    await user.save(); //save the data in the db

    res.status(200).json({
        success:true,
        message:"password updated succesfully",
    });
}); //TODO


const deleteUserProfile=asyncHandler(async(req,res)=>{
    const { _id }=req.myUser; //this we will get from authenticate middleware
    let deletedUser=await userCollection.findByIdAndDelete({_id}); //findone and deleteone
    if(!deletedUser) throw new ErrorHandler("user not found",404);
    res.status(200).json({
        success:true,
        message:"user deleted Succesfully",
        data:deletedUser,
    });
}); //delete the profile 

const getLoggedInUserProfile=asyncHandler(async(req,res)=>{
    res.status(200).json({
        success:true,
        userDetails:req.myUser,
    })
}); //in the frontend
module.exports={
    registerUser,
    loginUser,
    logout,
    deleteUserProfile,
    getLoggedInUserProfile,
    updateUserProfile,
    updateUserPassword,
};