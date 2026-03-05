const ReturnRequest = require('../models/ReturnRequest');

// User submits return request
const createReturnRequest = async (req, res) => {
  try {
    const { orderId, clerkUserId, userEmail, items, reason, totalAmount } = req.body;

    // Check if already requested
    const existing = await ReturnRequest.findOne({ orderId });
    if (existing) return res.status(400).json({ message: 'Return already requested for this order' });

    const request = await ReturnRequest.create({ orderId, clerkUserId, userEmail, items, reason, totalAmount });
    res.status(201).json({ message: 'Return request submitted', request });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// User gets their return requests
const getMyReturnRequests = async (req, res) => {
  try {
    const requests = await ReturnRequest.find({ clerkUserId: req.params.clerkUserId }).sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Admin gets all return requests
const getAllReturnRequests = async (req, res) => {
  try {
    const requests = await ReturnRequest.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Admin updates return request status
const updateReturnStatus = async (req, res) => {
  try {
    const { status, adminNote } = req.body;
    const request = await ReturnRequest.findByIdAndUpdate(
      req.params.id,
      { status, adminNote },
      { new: true }
    );
    if (!request) return res.status(404).json({ message: 'Request not found' });
    res.status(200).json({ message: 'Status updated', request });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createReturnRequest, getMyReturnRequests, getAllReturnRequests, updateReturnStatus };