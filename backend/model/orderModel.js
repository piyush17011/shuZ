const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],

  orderItems: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  }],

  amount: {
    type: Number,
    required: true,
  },

}, { timestamps: true }); // removed manual createdAt — timestamps:true handles createdAt & updatedAt automatically

module.exports = mongoose.model('Order', orderSchema);