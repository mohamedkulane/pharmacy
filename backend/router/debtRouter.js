const express = require("express")
const debtController = require("../controller/debtConroller")
const router = express.Router()

router.post("/create/debt", debtController.createDebt)
router.get("/read/debts", debtController.readDebts)        // ✔️ sax
router.put("/update/debt/:id", debtController.updateDebt)
router.get("/single/debt/:id", debtController.readSingleDebt) // ✔️ sax
router.delete("/delete/debt/:id", debtController.deleteDebt)

module.exports = router
