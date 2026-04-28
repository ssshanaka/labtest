const Item = require("../models/Item");

// @desc    Get all items
// @route   GET /api/items
const getItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Create an item
// @route   POST /api/items
const createItem = async (req, res) => {
  try {
    const { name, quantity, price, category, status } = req.body;

    if (!name || quantity === undefined || price === undefined) {
      return res
        .status(400)
        .json({ message: "Please provide name, quantity, and price" });
    }

    const newItem = await Item.create({
      name,
      quantity,
      price,
      category,
      status,
    });

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Update an item
// @route   PUT /api/items/:id
const updateItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    const updatedItem = await Item.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Delete an item
// @route   DELETE /api/items/:id
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    await Item.findByIdAndDelete(id);

    res.status(200).json({ message: "Item removed", id });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  getItems,
  createItem,
  updateItem,
  deleteItem,
};
