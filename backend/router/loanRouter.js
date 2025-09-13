const express=require("express")

const loanController=require("../controller/loanController")

const router=express.Router()

router.post("/create/loan", loanController.createLoan)
router.get("/read/loan", loanController.readLoan)
router.delete("/delete/loan/:id", loanController.deleteLoan)


module.exports=router