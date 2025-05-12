const { Router } = require("express");
const{registerUser, loginUser, logout, deleteUserProfile, getLoggedInUserProfile, updateUserProfile}=require("../controllers/user.controller");
const { authenticate } = require("../middlewares/authenticate.middleware");
const router=Router();
router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/logout",authenticate,logout);
router.delete("/delete-me",authenticate,deleteUserProfile);
router.get("/me",authenticate,getLoggedInUserProfile);
router.patch("/update",authenticate,updateUserProfile)
module.exports=router;