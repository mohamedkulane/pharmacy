const salesModel = require ("../models/sallesModel")

const createSales=async(req,res)=>{
    try {
       const {name,quantity,price,product} =req.body
      
       const newData= salesModel({
        name:name, 
        quantity:quantity,
        price:price,
        product:product,
       })

       const saveData=await newData.save()

       res.send(saveData)

    } catch (error) {
        res.status(400).json({message: "server error"})
    }
}

const readSales = async (req, res) => {
    try {
      const readData = await salesModel.find()
      res.send(readData)
    } catch (error) {
      res.status(500).json({ message: "Server error" })
    }
  }



  const updateSales = async (req,res) =>{
    try{
        const updateData = await salesModel.updateOne(
            {_id:req.params.id},
            {
                $set:{
                    name:req.body.name,
                    price:req.body.price,
                    product:req.body.product,
                    quantity:req.body.quantity,
                }
            }
        )
        if(updateData){
            res.send("success update")
        }
    }
    catch(error){
        res.status(400).json({message:"server is not update sales"})
    }
}


const readSingleSale = async(req,res) =>{
    try{
        const readsingle = await salesModel.find({_id:req.params.id})
        if(readsingle)
        {
            res.send(readsingle)
        }
    }
    catch(error){
        res.status(400).json({message:"server is not read single sales"})
    }
   
}



const deleteSales = async (req,res)=>{
    const removeData = await salesModel.deleteOne(
        {_id:req.params.id}
    )
    if(removeData)
    {
        res.send("Deleted")
    }
}



module.exports ={createSales,readSales,updateSales,readSingleSale,deleteSales}