const { Router } = require("express");
const{registerUser, loginUser, logout}=require("../controllers/user.controller");
const { authenticate } = require("../middlewares/authenticate.middleware");
const router=Router();
router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/logout",authenticate,logout);
module.exports=router;