const loanModel=require("../models/loansModel")

const createLoan=async(req,res)=>{
    try {
        const {name,address,phone,price,paid}=req.body

        const newLoan= loanModel({
            name,address,phone,price,paid
        })
        await newLoan.save()
        res.send(newLoan)
    } catch (error) {
        res.status(400).json({error:"server error"})
    }
}

const readLoan=async(req,res)=>{
    try {
        const getLoan=await loanModel.find()

        res.send(getLoan)
    } catch (error) {
        res.status(400).json({error:"server error"})

    }
}
const deleteLoan=async(req,res)=>{
    try {
        const getLoan=await loanModel.deleteOne({_id:req.params.id})

        res.send(getLoan)
    } catch (error) {
        res.status(400).json({error:"server error"})

    }
}

const readSingleData=async(req,res)=>{
    try {
    const getSingle=await loanModel.find({_id:req.params.id})

    if(getSingle){
        res.send(getSingle)
    }
        
    } catch (error) {
        res.status(401).json({error:"server error"})
        
    }

}

const updateLoan=async(req,res)=>{
    try {
        const update=await loanModel.updateOne(
            {_id:req.params.id},
            {$set:req.body}
        )
        if(update){
            res.send("success update")
        }

    } catch (error) {
        
    }
}

module.exports={createLoan,readLoan,deleteLoan,readSingleData,updateLoan}