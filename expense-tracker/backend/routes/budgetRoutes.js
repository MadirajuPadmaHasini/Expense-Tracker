const express = require("express");
const Budget = require("../models/Budget");

const router = express.Router();

// GET /api/budget -> get the monthly budget (0 if not set yet)
router.get("/", async (req, res) => {
  try {
    const budget = await Budget.findOne();
    res.json({ amount: budget ? budget.amount : 0 });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch budget" });
  }
});

// PUT /api/budget -> create or update the monthly budget
router.put("/", async (req, res) => {
  try {
    const amount = Number(req.body.amount);
    if (Number.isNaN(amount) || amount < 0) {
      return res.status(400).json({ message: "Enter a valid budget amount" });
    }
    const budget = await Budget.findOneAndUpdate({}, { amount }, { new: true, upsert: true });
    res.json({ amount: budget.amount });
  } catch (error) {
    res.status(500).json({ message: "Failed to update budget" });
  }
});

module.exports = router;
