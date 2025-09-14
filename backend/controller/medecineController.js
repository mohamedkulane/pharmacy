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


const readMedicine = async (req,res)=>{
    try{
          const {category} = req.body || {}
          let filterData = {}
          if(category)
          {
            filterData = {category}
          }

        const readData = await medecineModel.find(filterData)
        if(readData)
        {
            res.send(readData)
        }
    } 
    catch(error){
        res.status(400).json({message:"server is not read medicine"})
    }
    
}



const updateMedicine = async (req,res) =>{
    try{
        const updateData = await medecineModel.updateOne(
            {_id:req.params.id},
            {
                $set:{
                    name:req.body.name,
                    sell:req.body.sell,
                    purchase:req.body.purchase,
                    quantity:req.body.quantity,
                    profit:req.body.profit,
                    category:req.body.category,
                    mImage:req.file ? req.file.filename : undefined  
                }
            }
        )
        if(updateData){
            res.send("success update")
        }
    }
    catch(error){
        res.status(400).json({message:"server is not update medicine"})
    }
}



const Readsingle = async(req,res) =>{
    try{
        const readsingle = await medecineModel.find({_id:req.params.id})
        if(readsingle)
        {
            res.send(readsingle)
        }
    }
    catch(error){
        res.status(400).json({message:"server is not read single medicine"})
    }
   
}



const deleteMedicine = async (req,res)=>{
    const removeData = await medecineModel.deleteOne(
        {_id:req.params.id}
    )
    if(removeData)
    {
        res.send("Deleted")
    }
}


module.exports={createMedecine,readMedicine,updateMedicine,Readsingle,deleteMedicine}