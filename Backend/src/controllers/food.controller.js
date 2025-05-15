const AsyncHandler = require("express-async-handler");
const foodCollection=require("../models/food.model");
const { uploadImgOnCloudinary } = require("../utils/cloudinary.utils");
const ErrorHandler=require("../middlewares/error.middleware");

exports.addFood=async(req,res)=>{
    // console.log(req.file);
    const{name,description,price,category}=req.body;
    const localFilePath=req.file.path;

  let uploadResponse=await uploadImgOnCloudinary(localFilePath);
    // console.log(uploadResponse);
  

let newFood=await foodCollection.create({
    name,
    description,
    price,
    category,
    image:[{
      secure_url:uploadResponse?.secure_url,
      asset_id:uploadResponse?.asset_id,
      public_id:uploadResponse?.public_id

    },],
  //  " image.url": secure_url,
  //   "image.asset_id": asset_id,
  //   "image.public_id": public_id,
});
res.json({
    success:true,
    message:"food Added Succesfully",
    data:newFood,
});
};

exports.updateFoodDetails=AsyncHandler(async(req,res)=>{});

exports.updateFoodImage=AsyncHandler(async(req,res)=>{});


exports.deleteFood=AsyncHandler(async(req,res)=>{});


exports.getFoods=AsyncHandler(async(req,res)=>{
  let foods=await foodCollection.find();
  if(foods.length==0) throw new ErrorHandler("no food found",404);
  res.json({
    success:true,
    message:"foods fetched succesfully",
    count:foods.length,
    data:foods,
  });
});

exports.getSingleFood=AsyncHandler(async(req,res)=>{
  console.log(req.params);
    let extractedID=req.params.id;
    console.log(extractedID);

    let food =await foodCollection.findOne({ _id:extractedID});

    if(!food){
        return res.status(404).json({message:"no food found"})
    }
    res.status(200).json({success:true,message:"food fetched succesfully",food});
    // res.send(food);
});