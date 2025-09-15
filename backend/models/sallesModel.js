const mongoose=require("mongoose")
const  AutoIncrement = require('mongoose-sequence')(mongoose);
const sellesSchema=mongoose.Schema({
    name:{type:String, required:true},
    product:{type:String, required:true},
    // price:{type:Number, required:true},
    quantity:{type:Number, required:true},
})
sellesSchema.plugin(AutoIncrement, { inc_field: 'seId' });

module.exports=mongoose.model("sells",sellesSchema)