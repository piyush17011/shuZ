const Product = require('../model/productModel');

const createProduct = async (req, res) => {
  const { title, imageURL, price, category, ts, details } = req.body;
  try {
    const newProduct = new Product({ title, imageURL, price, category, ts: ts || false, details });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCategoryProducts = async (req, res) => {
  const cat = req.params.cat;
  try {
    const products = await Product.find({ category: cat }).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Returns only products marked as top selling (ts: true)
const getTsProducts = async (req, res) => {
  try {
    const products = await Product.find({ ts: true }).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingleProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById({ _id: id });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, imageURL, price, category, ts, details } = req.body;
  try {
    const updated = await Product.findByIdAndUpdate(
      id,
      { title, imageURL, price, category, ts: ts ?? false, details },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getCategoryProducts,
  getTsProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};