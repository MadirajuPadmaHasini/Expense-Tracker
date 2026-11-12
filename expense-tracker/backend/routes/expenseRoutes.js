const express = require("express");
const Expense = require("../models/Expense");

const router = express.Router();

// GET /api/expenses -> get all expenses (newest first)
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1, createdAt: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
});

// POST /api/expenses -> add a new expense
router.post("/", async (req, res) => {
  try {
    const { name, amount, category, date } = req.body;
    if (!name || !amount || !category || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const expense = await Expense.create({ name, amount, category, date });
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/expenses/:id -> delete one expense
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Expense.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Expense not found" });
    res.json({ message: "Expense deleted", id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: "Invalid expense id" });
  }
});

module.exports = router;
