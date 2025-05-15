const {Router}=require("express");
const {addFood, getFoods,getSingleFood}=require("../controllers/food.controller");
const {upload}=require("../middlewares/multer.middleware");
const router=Router();
router.post("/add-food",upload.single("image"),addFood);

router.get("/all-foods",getFoods);
router.get("/single-food/:id",getSingleFood);
module.exports=router;