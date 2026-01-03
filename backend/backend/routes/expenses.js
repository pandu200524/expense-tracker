const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const authMiddleware = require('../middleware/authMiddleware');

// Apply auth middleware to all routes
router.use(authMiddleware);

// GET all expenses for logged-in user
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.userId }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single expense
router.get('/:id', async (req, res) => {
  try {
    const expense = await Expense.findOne({ 
      _id: req.params.id, 
      userId: req.user.userId 
    });
    
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new expense
router.post('/', async (req, res) => {
  const expense = new Expense({
    userId: req.user.userId,
    title: req.body.title,
    amount: req.body.amount,
    category: req.body.category,
    date: req.body.date,
    description: req.body.description,
    paymentMethod: req.body.paymentMethod
  });

  try {
    const newExpense = await expense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update expense
router.put('/:id', async (req, res) => {
  try {
    const expense = await Expense.findOne({ 
      _id: req.params.id, 
      userId: req.user.userId 
    });
    
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    expense.title = req.body.title || expense.title;
    expense.amount = req.body.amount || expense.amount;
    expense.category = req.body.category || expense.category;
    expense.date = req.body.date || expense.date;
    expense.description = req.body.description || expense.description;
    expense.paymentMethod = req.body.paymentMethod || expense.paymentMethod;

    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE expense
router.delete('/:id', async (req, res) => {
  try {
    const expense = await Expense.findOne({ 
      _id: req.params.id, 
      userId: req.user.userId 
    });
    
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    
    await expense.deleteOne();
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET analytics data for logged-in user
router.get('/analytics/summary', async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.userId });
    
    // Calculate total
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    
    // Group by category
    const byCategory = expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {});
    
    // Group by month
    const byMonth = expenses.reduce((acc, exp) => {
      const month = new Date(exp.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      acc[month] = (acc[month] || 0) + exp.amount;
      return acc;
    }, {});

    res.json({
      total,
      count: expenses.length,
      byCategory,
      byMonth
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;