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

export {getProductById, getProducts};
