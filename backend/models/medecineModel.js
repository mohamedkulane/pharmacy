const mongoose=require("mongoose")

const medecineSchema=mongoose.Schema({
    name:{type:String, required:true},
    mImage:{type:String, required:true},
    category:{type:String, required:true},
    purchase:{type:Number, required:true},
    sell:{type:Number, required:true},
    profit:{type:Number, required:true},
    quantity:{type:Number, required:true},
})
module.exports=mongoose.model("medecine", medecineSchema)