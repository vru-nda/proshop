import express from 'express';
const router = express.Router();

import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from '../controllers/orderController.js';
import {isAdmin, protect} from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems).get(protect, isAdmin, getOrders);

router.route('/myorders').get(protect, getMyOrders);

router.route('/:orderId').get(protect, getOrderById);

router.route('/:orderId/pay').put(protect, updateOrderToPaid);

router.route('/:orderId/deliver').put(protect, isAdmin, updateOrderToDelivered);

export default router;
