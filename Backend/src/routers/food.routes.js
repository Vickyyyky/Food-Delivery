const {Router}=require("express");
const {addFood, getFoods,getSingleFood,deleteFood}=require("../controllers/food.controller");
const {upload}=require("../middlewares/multer.middleware");
const router=Router();
router.post("/add-food",upload.single("image"),addFood);

router.get("/all-foods",getFoods);
router.get("/single-food/:id",getSingleFood);
router.delete("/delete-food/:id",deleteFood);
module.exports=router;