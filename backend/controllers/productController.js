import asyncHandler from 'express-async-handler'; //handles the exceptions/errors in express routes

import Product from '../models/Product.js';

// @desc    Fetch all products
// @route   GET /api/products
// @acesss  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 5;
  const page = Number(req.query.pageNum) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};
  const count = await Product.count({...keyword}); //total number of products
  const products = await Product.find({...keyword})
    .limit(pageSize) // limit the number of products to be fetched
    .skip(pageSize * (page - 1)); // skip the page to get the products from the appropriate page

  res.json({products, page, pages: Math.ceil(count / pageSize)});
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

// @desc    Create new review
// @route   POST /api/products/:prodId/reviews
// @acesss  Private
const createProductReview = asyncHandler(async (req, res) => {
  const {rating, comment} = req.body;

  const product = await Product.findById(req.params.prodId);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed!');
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.avgRating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({message: 'Review Added.'});
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({avgRating: -1}).limit(3);
  res.json(products);
});

export {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
};
