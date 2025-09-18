const mongoose=require("mongoose")
const  AutoIncrement = require('mongoose-sequence')(mongoose);
const medecineSchema=mongoose.Schema({
    name:{type:String, required:true},
    mImage:{type:String, required:true},
    category:{type:String, required:true},
    purchase:{type:Number, required:true},
    sell:{type:Number, required:true},
    quantity:{type:Number, required:true},
})


medecineSchema.plugin(AutoIncrement, { inc_field: 'prId' });
module.exports=mongoose.model("medecines", medecineSchema)