const adminModel=require("../models/adminModel")
const bcrypt=require("bcrypt")
const createAdmin=async(req,res)=>{
    try {
        const {name,email,password}=req.body
    const existEmail= await adminModel.findOne({email})
    if(existEmail){
        res.status(400).json({message: "email is already exist "})
    }
     const hashPassword = await bcrypt.hash(password, 10)

    const newData = new adminModel({
                name,
                email,
                password: hashPassword
            })

            await newData.save()
            res.send(newData)
    
    } catch (error) {
        res.status(500).json({message: "server error"})
    }
}

const adminLogin=async(req,res)=>{
    try {
         const {email,password } = req.body

        // email-check

        const existEmail = await adminModel.findOne({ email })
        if (!existEmail) {
            return res.status(400).json({ error: "invalid email" })
        } 

        const checkPassword = await bcrypt.compare(password,existEmail.password )
        if(!checkPassword){
             return res.status(400).json({ error: "invalid password" })

        }
        
             res.send({
            message: "succes login",
            Admin: {
                name: existEmail.name,
                email: existEmail.email,
            }
        })

    } catch (error) {
        res.status(500).json({message: "server error"})
        
    }


}

module.exports={createAdmin,adminLogin}