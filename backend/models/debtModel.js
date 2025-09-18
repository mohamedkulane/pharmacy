const mongoose = require("mongoose")
const AutoIncrement = require("mongoose-sequence")(mongoose)

const debtSchema = mongoose.Schema({
    companyName: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    paidAmount: { type: Number, required: true }   // kista aad bixisay
})

debtSchema.plugin(AutoIncrement, { inc_field: 'debtId' })

module.exports = mongoose.model("debts", debtSchema)
