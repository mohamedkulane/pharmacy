const express=require("express")
const mongoose=require("mongoose")
const app=express()

// All routes import
const MedecineRoute=require("../backend/router/medecineRouter")
const AdminRoute=require("../backend/router/adminRouter")
<<<<<<< HEAD
const salesRoute = require("../backend/router/salesRouter")
=======
const LoanRoute=require("../backend/router/loanRouter")



>>>>>>> 9132cb11f173c2282db1177c3b544399a5e0c833
const cors=require("cors")
require("dotenv").config()
app.use(express.json())
app.use(cors())
app.use(MedecineRoute)
app.use(AdminRoute)
<<<<<<< HEAD
app.use(salesRoute)
app.use("/allImg",express.static("images"))
=======
app.use(LoanRoute)
>>>>>>> 9132cb11f173c2282db1177c3b544399a5e0c833

mongoose.connect(process.env.DB_URL).then(()=> console.log("succes connection.."))
app.listen(5100, ()=>console.log("server is running..."))