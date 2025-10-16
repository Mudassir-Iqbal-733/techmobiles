const Product = require('../models/products.model');

// Create a new product
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//search products by name or category

const searchProducts = async (req, res) => {
  const { query } = req;

  let filter = {};

  if (query.name) {
    filter.name = { $regex: query.name, $options: 'i' }; // Case-insensitive search
  }

  if (query.brand) {
    filter.brand = { $regex: query.brand, $options: 'i' };
  }

  try {
    const products = await Product.find(filter);
    return res.status(200).json({
      success: true,
      products: products
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const filterProducts = async (req, res) => {
  const { minPrice, maxPrice, brand, ram, storage } = req.query;

  let filter = {};

  if (minPrice && maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  if (brand) {
    const brands = brand.split(',');
    filter.brand = { $in: brands };
  }
  // Handle multiple RAM options
  if (ram) {
    const rams = ram.split(',');
    filter.ram = { $in: rams };
  }
  if (storage) {
    const storages = storage.split(',');
    filter.storage = { $in: storages };
  }

  // console.log(filter);

  // return;

  try {
    const products = await Product.find(filter);
    return res.status(200).json({
      success: true,
      products: products
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  deleteProduct,
  filterProducts,
  updateProduct,
  searchProducts
};
