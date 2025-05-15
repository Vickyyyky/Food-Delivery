const asyncHandler=require("express-async-handler");
const { cloudinary } = require("../config/cloudinary");
const fs=require("fs");
// console.log(cloudinary);
const cloud=require("cloudinary")
console.log(cloudinary);
let uploadImgOnCloudinary=asyncHandler(async(path)=>{
   if(!path) return null;
   let result=await cloud.uploader.upload(path,{
      folder:"bitByte",
   });
   fs.unlinkSync(path);
   return result;
});



module.exports={uploadImgOnCloudinary};