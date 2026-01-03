const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Healthcare', 'Education', 'Other']
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  description: {
    type: String,
    trim: true
  },
  paymentMethod: {
    type: String,
    enum: ['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Net Banking'],
    default: 'Cash'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Expense', expenseSchema);