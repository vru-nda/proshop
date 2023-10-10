import asyncHandler from 'express-async-handler'; //handles the exceptions/errors in express routes

import Product from '../models/Product.js';

// @desc    Fetch all products
// @route   GET /api/products
// @acesss  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Fetch a single product
// @route   GET /api/products/:prodId
// @acesss  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.prodId);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found!');
  }
});

// @desc    Delete a single product
// @route   GET /api/products/:prodId
// @acesss  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.prodId);

  if (product) {
    await product.remove();
    res.json({message: 'Product removed successfully'});
  } else {
    res.status(404);
    throw new Error('Product not found!');
  }
});

// @desc    Create a product
// @route   POST /api/products/:prodId
// @acesss  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: 'images/sample.jpeg',
    brand: 'Sample brand',
    category: 'Sample Category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:prodId
// @acesss  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {name, description, price, image, brand, category, countInStock} =
    req.body;

  const product = await Product.findById(req.params.prodId);

  if (product) {
    product.name = name;
    product.description = description;
    product.price = price;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
};
