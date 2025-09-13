const adminController=require("../controller/adminController")
const express=require("express")

const router=express.Router()

router.post("/create/admin", adminController.createAdmin)
router.post("/login/admin", adminController.adminLogin)

module.exports=router