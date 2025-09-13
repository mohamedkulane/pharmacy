const medecineModel=require("../models/medecineModel")

const createMedecine=async(req,res)=>{
    try {
       const {name,category,quantity,sell,purchase,profit} =req.body

       const newData= medecineModel({
        name:name,
        category:category,
        quantity:quantity,
        sell:sell,
        purchase:purchase,
        profit:profit,
        mImage:req.file.filename
       })

       const saveData=await newData.save()

       res.send(saveData)

    } catch (error) {
        res.status(400).json({message: "server error"})
    }
}

module.exports={createMedecine}