import asyncHandler from 'express-async-handler'; //handles the exceptions/errors in express routes

import Order from '../models/Order.js';

// @desc    Creatw a new order
// @route   POST /api/orders
// @acesss  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems?.length === 0) {
    res.status(400);
    throw new Error('No order items');
    return;
  } else {
    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user: req.user._id,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc    Fetch order by ID
// @route   GET /api/orders/:orderId
// @acesss  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.orderId).populate(
    'user',
    'name email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found!');
  }
});

// @desc    Update order to Paid
// @route   GET /api/orders/:orderId/pay
// @acesss  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.orderId);

  const {
    id,
    status,
    update_time,
    player: {email_address},
  } = req.body;

  console.log('req.body', req.body);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id,
      status,
      update_time,
      email_address,
    };

    const updatedOrder = await User.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found!');
  }
});

export {addOrderItems, getOrderById, updateOrderToPaid};
