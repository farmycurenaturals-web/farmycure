const Order = require('../models/Order');
const Cart = require('../models/Cart');

const createOrder = async (req, res) => {
  try {
    const { shippingAddress, items, totalPrice, razorpay } = req.body;
    const sessionId = req.header('x-session-id');
    const userId = req.user?.id;

    if (!shippingAddress || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'shippingAddress and items are required' });
    }

    const computedTotal = items.reduce(
      (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
      0
    );

    const order = await Order.create({
      user: userId,
      sessionId: userId ? undefined : sessionId,
      items,
      totalPrice: Number(totalPrice || computedTotal),
      shippingAddress,
      paymentStatus: razorpay?.paymentId ? 'paid' : 'pending',
      status: 'processing',
      razorpay
    });

    if (userId) {
      await Cart.findOneAndDelete({ user: userId });
    } else if (sessionId) {
      await Cart.findOneAndDelete({ sessionId });
    }

    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const isAdminRequest = req.query.scope === 'all';
    if (isAdminRequest && !['admin', 'owner'].includes(req.user?.role)) {
      return res.status(403).json({ message: 'Forbidden: insufficient role permissions' });
    }
    const query = isAdminRequest ? {} : req.user?.id ? { user: req.user.id } : {};
    const orders = await Order.find(query).populate('items.productId').sort({ createdAt: -1 });
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.productId');
    if (order) {
      return res.json(order);
    }
    return res.status(404).json({ message: 'Order not found' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;
    const update = {};
    if (status) update.status = status;
    if (paymentStatus) update.paymentStatus = paymentStatus;
    const order = await Order.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    return res.json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, getOrders, getOrderById, updateOrder };