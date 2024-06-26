import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/OderModel.js";
import Product from "../models/ProductModel.js";
import { calcPrices } from "../utils/calcPrices.js";
import { checkIfNewTransaction, verifyPayPalPayment } from "../utils/paypal.js";

// @desc    Create new order
// @route   POST /api/orders
// @acces   Private
// @desc    Create new order
// @route   POST /api/orders
// @acces   Private
const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((x) => x._id) },
    });

    const dbOrderItems = orderItems.map((itemFromClient) => {
      const matchingItemFromDB = itemsFromDB.find(
        (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
      );
      // Calculate stock
      const remainingStock =
        matchingItemFromDB.countInStock - itemFromClient.qty;
      if (remainingStock < 0) {
        throw new Error(
          `Insufficient stock for item ${matchingItemFromDB.name}`
        );
      }

      // Update item stock
      matchingItemFromDB.countInStock = remainingStock;
      matchingItemFromDB.save();

      return {
        ...itemFromClient,
        product: itemFromClient._id,
        price: matchingItemFromDB.price,
        _id: undefined,
      };
    });

    // Calculate prices
    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calcPrices(dbOrderItems);

    const order = new Order({
      orderItems: dbOrderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @acces   Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @acces   Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @acces   Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const { verified, value } = await verifyPayPalPayment(req.body.id);
  if (!verified) throw new Error("Payment not verified");

  //check if the transaction has been used before
  const isNewTransaction = await checkIfNewTransaction(Order, req.body.id);
  if (!isNewTransaction) throw new Error("Transaction has been used before");

  const order = await Order.findById(req.params.id);

  if (order) {
    //check if the correct amount was paid
    const paidCorrectAmount = order.totalPrice.toString() === value;
    if (!paidCorrectAmount) throw new Error("Incorrect amount paid");

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @acces   Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new error("Order not found!");
  }
});

// @desc    Get all orders
// @route   GET /api/orders/
// @acces   Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Order.countDocuments();
  const orders = await Order.find({})
    .populate("user", "id name")
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.status(200).json({ orders, page, pages: Math.ceil(count / pageSize) });
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToDelivered,
  updateOrderToPaid,
  getOrders,
};
