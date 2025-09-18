const express=require("express")
const uploadImage=require("../middleware/uploadImage")
const medecineController=require("../controller/medecineController")
const router=express.Router()

router.post("/create/medicine", uploadImage.single("img"), medecineController.createMedecine)
router.get("/read/medicine",medecineController.readMedicine)
router.put("/update/medicine/:id",uploadImage.single("img"),medecineController.updateMedicine)
router.get("/single/medicine/:id",medecineController.Readsingle)
router.delete("/delete/medicine/:id",medecineController.deleteMedicine)

module.exports=router