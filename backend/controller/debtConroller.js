const debtModel = require("../models/debtModel")

// Create debt
const createDebt = async (req, res) => {
  try {
    const { companyName, phone, address, productName, price, quantity, paidAmount } = req.body

    const newDebt = new debtModel({
      companyName,
      phone,
      address,
      productName,
      price,
      quantity,
      paidAmount,
    })

    const savedDebt = await newDebt.save()
    res.status(201).json(savedDebt)
  } catch (error) {
    res.status(400).json({ message: "Server error" })
  }
}

// Read all debts
const readDebts = async (req, res) => {
  try {
    const debts = await debtModel.find()
    res.status(200).json(debts)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}

// Update debt
const updateDebt = async (req, res) => {
  try {
    const updateData = await debtModel.updateOne(
      { _id: req.params.id },
      {
        $set: req.body
      }
    )
    if (updateData.modifiedCount > 0) {
      res.status(200).json({ message: "Debt updated successfully" })
    } else {
      res.status(404).json({ message: "Debt not found" })
    }
  } catch (error) {
    res.status(400).json({ message: "Server error" })
  }
}

// Read single debt
const readSingleDebt = async (req, res) => {
  try {
    const debt = await debtModel.find({_id:req.params.id})
    if (debt) {
      res.status(200).json(debt)
    } else {
      res.status(404).json({ message: "Debt not found" })
    }
  } catch (error) {
    res.status(400).json({ message: "Server error" })
  }
}

// Delete debt
const deleteDebt = async (req, res) => {
  try {
    const deleted = await debtModel.deleteOne({ _id: req.params.id })
    if (deleted.deletedCount > 0) {
      res.status(200).json({ message: "Debt deleted successfully" })
    } else {
      res.status(404).json({ message: "Debt not found" })
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}

module.exports = {
  createDebt,
  readDebts,
  updateDebt,
  readSingleDebt,
  deleteDebt,
}
