import express from 'express';
const router = express.Router();

import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProductById,
  getProducts,
  getTopProducts,
  updateProduct,
} from '../controllers/productController.js';
import {protect, isAdmin} from '../middleware/authMiddleware.js';

router.route('/').get(getProducts).post(protect, isAdmin, createProduct);

router.route('/top').get(getTopProducts);

router.route('/:prodId/reviews').post(protect, createProductReview);

router
  .route('/:prodId')
  .get(getProductById)
  .put(protect, isAdmin, updateProduct)
  .delete(protect, isAdmin, deleteProduct);

export default router;
