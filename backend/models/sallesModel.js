const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [
    {
      product: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Sale", saleSchema);
