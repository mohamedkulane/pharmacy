const express=require("express")
const uploadImage=require("../middleware/uploadImage")
const medecineController=require("../controller/medecineController")
const router=express.Router()

router.post("/create/medecine", uploadImage.single("img"), medecineController.createMedecine)


module.exports=router