const express = require("express")
const debtController = require("../controller/debtConroller")
const router = express.Router()

router.post("/create/debt", debtController.createDebt)
router.get("/read/debts", debtController.readDebts)        
router.put("/update/debt/:id", debtController.updateDebt)
router.get("/single/debt/:id", debtController.readSingleDebt) // 
router.delete("/delete/debt/:id", debtController.deleteDebt)

module.exports = router
