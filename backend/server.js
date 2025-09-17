const express=require("express")
const mongoose=require("mongoose")
const app=express()

// All routes import
const MedecineRoute=require("../backend/router/medecineRouter")
const AdminRoute=require("../backend/router/adminRouter")
const salesRoute = require("../backend/router/salesRouter")
const LoanRoute=require("../backend/router/loanRouter")
const DebtRoute=require("../backend/router/debtRouter")



const cors=require("cors")
require("dotenv").config()
app.use(express.json())
app.use(cors())
app.use(MedecineRoute)
app.use(AdminRoute)
app.use(salesRoute)
app.use("/allImg",express.static("images"))
app.use(LoanRoute)
app.use(DebtRoute)

mongoose.connect(process.env.DB_URL).then(()=> console.log("succes connection.."))
app.listen(5000, ()=>console.log("server is running..."))