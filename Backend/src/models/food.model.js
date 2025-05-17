const mongoose=require("mongoose");

const foodSchema= new mongoose.Schema(
    {
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
        minlength:[10,"minimum length should be 10"],
    },
    price:{
        type:Number,
        required:true,
    },
    image:
        [
            {
                secure_url:{
                    type:String,
                },
                asset_id:{
                    type:String,
                },
                public_id:{
                    type:String,
                },
                _id:false
            },
        ],
    
    category:{
           type:String,
           required:true,
    },
},
{timestamps:true,minimize:false});

module.exports=mongoose.model("Food",foodSchema);