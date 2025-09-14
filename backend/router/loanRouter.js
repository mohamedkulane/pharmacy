const express=require("express")

const loanController=require("../controller/loanController")

const router=express.Router()

router.post("/create/loan", loanController.createLoan)
router.get("/read/loan", loanController.readLoan)
router.delete("/delete/loan/:id", loanController.deleteLoan)
router.get("/readSingle/loan/:id", loanController.readSingleData)
router.put("/update/loan/:id", loanController.updateLoan)


module.exports=router