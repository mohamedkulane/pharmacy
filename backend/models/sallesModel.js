const mongoose=require("mongoose")

const sellesSchema=mongoose.Schema({
    name:{type:String, required:true},
    product:{type:String, required:true},
    price:{type:Number, required:true},
    quantity:{type:String, required:true},
})

module.exports=mongoose("sells",sellesSchema)