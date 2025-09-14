const mongoose=require("mongoose")

const loansSchema=mongoose.Schema({
    name:{type:String, required:true},
    phone:{type:Number, required:true},
    address:{type:String, required:true},
    price:{type:Number, required:true},
    paid:{type:Number, },
})

module.exports=mongoose.model("loans", loansSchema)