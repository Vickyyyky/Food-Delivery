// npm i express mongodb npm i express mongoose multer cloudinary bcryptjs dotenv cookie-parser
// express-async-handler jsonwebtoken nodemon

const app=require("./app");
const { connectDB } = require("./src/config/database");
connectDB()
.then(()=>{
    app.listen(process.env.PORT,(err)=>{
        if(err) console.log("error while starting the server")
            console.log("Server Running at Port Number 9000")
    });
})
.catch((err)=>{
    console.log("error occured while connecting to database");
    console.log(err);
    process.exit(1);  //if any error occurs,then exit the application
});

