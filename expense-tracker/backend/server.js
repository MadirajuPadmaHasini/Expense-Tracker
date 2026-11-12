// Entry point of the Express backend
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const expenseRoutes = require("./routes/expenseRoutes");
const budgetRoutes = require("./routes/budgetRoutes");

const app = express();

// Middleware
app.use(cors()); // allow requests from the React app
app.use(express.json()); // read JSON request bodies

// Routes
app.get("/", (req, res) => res.send("Expense Tracker API is running"));
app.use("/api/expenses", expenseRoutes);
app.use("/api/budget", budgetRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
