const salesModel = require ("../models/sallesModel")
const medecineModel = require ("../models/medecineModel")

const createSales = async (req, res) => {
  try {
    const { name, quantity, product } = req.body;

    // Hubi in medicine ka jiro
    const med = await medecineModel.findOne({ name: product });
    if (!med) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    // Hubi in stock ku filan yahay
    if (med.quantity < quantity) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    // Hubi in price saxan yahay (price laga qaado medecine DB)
    const price = med.price;

    // Sale cusub abuur
    const newData = salesModel({
      name,
      quantity,
      price,   // price sax ah
      product,
    });

    const saveData = await newData.save();

    // Medicine qty iska jari
    med.quantity -= quantity;
    await med.save();

    res.send({ sale: saveData, updatedMedicine: med });

  } catch (error) {
    res.status(400).json({ message: "Server error", error: error.message });
  }
};

const readSales = async (req, res) => {
    try {
      const readData = await salesModel.find()
      res.send(readData)
    } catch (error) {
      res.status(500).json({ message: "Server error" })
    }
  }



  // updateSales
const updateSales = async (req,res) =>{
  try{
      // hel sale hore
      const sale = await salesModel.findById(req.params.id);
      if (!sale) {
        return res.status(404).json({ message: "Sale not found" });
      }

      // hubi medicine sax ah
      const med = await medecineModel.findOne({ name: req.body.product });
      if (!med) {
        return res.status(404).json({ message: "Medicine not found" });
      }

      // ku qasb in price had iyo jeer noqdo price medicine DB
      const updateData = await salesModel.updateOne(
          {_id:req.params.id},
          {
              $set:{
                  name:req.body.name,
                  product:req.body.product,
                  quantity:req.body.quantity,
                  price: med.price,   // price sax ah
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



const deleteSales = async (req, res) => {
  try {
    // Hel sale-ga la tirtirayo
    const sale = await salesModel.findById(req.params.id);
    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }

    // Medicine stock dib ugu celi
    const med = await medecineModel.findOne({ name: sale.product });
    if (med) {
      med.quantity += sale.quantity;
      await med.save();
    }

    // Sale delete
    await salesModel.deleteOne({ _id: req.params.id });

    res.send({ message: "Deleted and stock restored", updatedMedicine: med });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



module.exports ={createSales,readSales,updateSales,readSingleSale,deleteSales}