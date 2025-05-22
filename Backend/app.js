const express=require("express");
require("dotenv").config();
const cookieParser=require("cookie-parser");
const userRoutes=require("./src/routers/user.routes");
const foodRoutes=require("./src/routers/food.routes");
const cartRoutes=require("./src/routers/cart.routes")
const orderRoutes = require("./src/routers/order.routes");
const error = require("./src/middlewares/error.middleware");
const app=express();
//!middleware Section
app.use(express.json());
app.use(cookieParser());

app.use("/users/v1",userRoutes);
app.use("/foods/v1",foodRoutes);
app.use("/carts/v1",cartRoutes);
app.use("/orders/v1", orderRoutes);





//! error middleware
app.use(error);
module.exports=app;

