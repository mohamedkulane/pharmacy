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

module.exports={createLoan,readLoan,deleteLoan}