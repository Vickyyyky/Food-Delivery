const foodCollection=require("../models/food.model");
const { uploadImgOnCloudinary } = require("../utils/cloudinary.utils");

exports.addFood=async(req,res)=>{
    // console.log(req.file);
    const{name,description,price,category}=req.body;
    const{path}=req.file
   let {asset_id,public_id,secure_url}= uploadImgOnCloudinary(req.file.path)
  console.log(asset_id);

// let newFood=await foodCollection.create({
//     name,
//     description,
//     price,
//     category,
//    " image.url": secure_url,
//     "image.asset_id": asset_id,
//     "image.public_id": public_id,
// });
// res.json({
//     success:true,
//     message:"food Added Succesfully",
//     data:newFood,
// });
};