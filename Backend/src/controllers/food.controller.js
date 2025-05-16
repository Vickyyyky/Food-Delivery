const AsyncHandler = require("express-async-handler");
const foodCollection=require("../models/food.model");
const { uploadImgOnCloudinary ,deleteImgFromCloudinary} = require("../utils/cloudinary.utils");

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

exports.updateFoodDetails=AsyncHandler(async(req,res)=>{
  let {name,description,price,category}=req.body;
  let updateFood=await foodCollection.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      price,
      category,
    },
    { new: true }
  );
  if(!updateFood) throw new ErrorHandler("food not found",404);
  res.json({
    success:true,
    message:"food updated successfully",
    data:updateFood,
  });
});

exports.updateFoodImage=AsyncHandler(async(req,res)=>{
  let {id}=req.params;
  let food=await foodCollection.findById(id);
  let public_id=food.image[0].public_id;
  let deleteimage=await deleteImgFromCloudinary(public_id);
  let localFilePath=req.file.path;
  let uploadResponse=await uploadImgOnCloudinary(localFilePath);
  
  console.log(public_id)
  // console.log(food);
 
  food.image[0].secure_url=uploadResponse?.secure_url;
  food.image[0].asset_id=uploadResponse?.asset_id;
  food.image[0].public_id=uploadResponse?.public_id;

  await food.save();
  res.json({
    success:true,
    message:"food image updated successfully",
    data:food,
  });
});


exports.deleteFood=AsyncHandler(async(req,res)=>{
  let {id}=req.params;
  let food=await foodCollection.findOne({_id:id});
  let public_id=food.image[0].public_id;
  console.log(public_id)
  // console.log(food);
  let deleteimage=await deleteImgFromCloudinary(public_id);
  let deletedFood=await foodCollection.findByIdAndDelete(id);
  res.json({
    success:true,
    message:"food deleted successfully",
    data:deletedFood,
  });

});
/*
{
_id:605c72f8e3b0a2d1f4c8b5a1
name: 'Pizza',
description: 'Delicious cheese pizza',
}
*/


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