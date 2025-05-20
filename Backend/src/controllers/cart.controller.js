
const foodCollection = require("../models/food.model");
const userCollection=require("../models/user.model");
const asyncHandler = require("express-async-handler");  


const addFoodToCart = asyncHandler(async (req, res) => {
    // console.log(req.myUser);
    let foodId=req.body.foodId;
    let loggedinUser=req.myUser;
    let cartData = loggedinUser.cartData;
    if(cartData[foodId]){
        cartData[foodId] +=1;
    } else{
        cartData[foodId]=1;
    }
    await userCollection.findByIdAndUpdate(
        loggedinUser._id,
        {cartData},
        {new:true} //it will return the updated data
    )
    res.status(200).json({
        success:true,
        message:"Food added to cart",
    
    });
})
const removeFoodFromCart = asyncHandler(async (req, res) => {
    let foodId=req.body.foodId;
    let loggedinUser=req.myUser;
    let cartData = loggedinUser.cartData;
    if(cartData[foodId]==undefined) throw new ErrorHandler("Food not found in cart",400);
      
    if(cartData[foodId]>1)cartData[foodId] -=1;
    else delete cartData[foodId];
    await userCollection.findByIdAndUpdate(
        loggedinUser._id,
        {cartData},
        {new:true} //it will return the updated data
    )
}) 
const getCart = asyncHandler(async (req, res) => {
    let loggedinUser=req.myUser;
    console.log(Object.keys(loggedinUser.cartData));
    let keysArray=Object.keys(loggedinUser.cartData);   
    if(keysArray.length==0) throw new ErrorHandler("Cart is empty",404);

    let valuesArray=Object.values(loggedinUser.cartData);
    console.log(valuesArray); 
  let items=  valuesArray.reduce((acc,curr) => acc + curr, 0)
    res.status(200).json({
        success:true,
        items:items,
        cart:loggedinUser.cartData
    })
})
module.exports = {
  addFoodToCart,
  removeFoodFromCart,
  getCart,
};


//req.myUser=>logged in user
// cart details of the logged in user
