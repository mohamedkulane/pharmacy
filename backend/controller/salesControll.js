const salesModel = require("../models/sallesModel");
const medecineModel = require("../models/medecineModel");

// POST /create/sales
const createSales = async (req, res) => {
  try {
    const { name, items } = req.body; // items = [{product, quantity}, ...]

    if (!name || !items || items.length === 0) {
      return res.status(400).json({ message: "Customer name and items required" });
    }

    const itemsWithPrice = [];

    for (const item of items) {
      const med = await medecineModel.findOne({ name: item.product });
      if (!med) return res.status(404).json({ message: `Medicine ${item.product} not found` });
      if (med.quantity < item.quantity) return res.status(400).json({ message: `Not enough stock for ${item.product}` });

      itemsWithPrice.push({
        product: item.product,
        quantity: item.quantity,
        price: med.sell // Price ka ka DB
      });

      // Stock update
      med.quantity -= item.quantity;
      await med.save();
    }

    const newSale = new salesModel({
      name,
      items: itemsWithPrice
    });

    const savedSale = await newSale.save();
    res.status(201).json(savedSale);

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET /read/sales
const readSales = async (req, res) => {
  try {
    const readData = await salesModel.find();
    res.json(readData);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// PUT /update/sales/:id
const updateSales = async (req, res) => {
  try {
    const sale = await salesModel.findById(req.params.id);
    if (!sale) return res.status(404).json({ message: "Sale not found" });

    const med = await medecineModel.findOne({ name: req.body.product });
    if (!med) return res.status(404).json({ message: "Medicine not found" });

    // Update price from medicine DB
    sale.name = req.body.name;
    sale.product = req.body.product;
    sale.quantity = req.body.quantity;
    sale.price = med.price;
    sale.total = med.price * req.body.quantity;

    await sale.save();
    res.json({ message: "Sale updated successfully", sale });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET /single/sales/:id
const readSingleSale = async (req, res) => {
  try {
    const sale = await salesModel.findById(req.params.id);
    if (!sale) return res.status(404).json({ message: "Sale not found" });
    res.json(sale);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// DELETE /delete/sales/:id
const deleteSales = async (req, res) => {
  try {
    const sale = await salesModel.findById(req.params.id);
    if (!sale) return res.status(404).json({ message: "Sale not found" });

    // Stock dib ugu celi
    const med = await medecineModel.findOne({ name: sale.product });
    if (med) {
      med.quantity += sale.quantity;
      await med.save();
    }

    await salesModel.deleteOne({ _id: req.params.id });
    res.json({ message: "Sale deleted and stock restored", sale });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createSales, readSales, updateSales, readSingleSale, deleteSales };
