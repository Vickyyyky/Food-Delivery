const {Router}=require("express");
const {addFood, getFoods,getSingleFood,deleteFood,updateFoodImage, updateFoodDetails}=require("../controllers/food.controller");
const {upload}=require("../middlewares/multer.middleware");
const router=Router();
router.post("/add-food",upload.single("image"),addFood);

router.get("/all-foods",getFoods);
router.get("/single-food/:id",getSingleFood);
router.delete("/delete-food/:id",deleteFood);
router.patch("/update-food/:id",updateFoodDetails);
router.patch("/update-image/:id",upload.single("image"),updateFoodImage);
module.exports=router;