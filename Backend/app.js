const express=require("express");
require("dotenv").config();
const cookieParser=require("cookie-parser");
const userRoutes=require("./src/routers/user.routes");
const error = require("./src/middlewares/error.middleware");
const app=express();
//!middleware Section
app.use(express.json());
app.use(cookieParser());

app.use("/users/v1",userRoutes);





//! error middleware
app.use(error);
module.exports=app;

