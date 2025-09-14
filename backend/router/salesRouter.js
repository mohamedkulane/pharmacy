const express=require("express")
const salesController=require("../controller/salesControll")
const router=express.Router()

router.post("/create/sales", salesController.createSales)
router.get("/read/sales",salesController.readSales)
router.put("/update/sales/:id",salesController.updateSales)
router.get("/single/sales/:id",salesController.readSingleSale)
router.delete("/delete/sales/:id",salesController.deleteSales)
module.exports=router