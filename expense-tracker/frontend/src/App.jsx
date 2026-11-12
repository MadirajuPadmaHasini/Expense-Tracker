import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import SummaryCards from "./components/SummaryCards.jsx";
import BudgetForm from "./components/BudgetForm.jsx";
import ExpenseForm from "./components/ExpenseForm.jsx";
import ExpenseTable from "./components/ExpenseTable.jsx";
import About from "./components/About.jsx";
import * as api from "./api.js";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(0);
  const [error, setError] = useState("");

  // Load saved expenses and budget from MongoDB when the app starts
  useEffect(() => {
    const loadData = async () => {
      try {
        const [expenseList, budgetData] = await Promise.all([api.getExpenses(), api.getBudget()]);
        setExpenses(expenseList);
        setBudget(budgetData.amount);
      } catch {
        setError("Could not connect to the server. Make sure the backend is running on port 5000.");
      }
    };
    loadData();
  }, []);

  const handleAddExpense = async (expense) => {
    try {
      const saved = await api.addExpense(expense);
      setExpenses([saved, ...expenses]);
    } catch {
      setError("Failed to add expense.");
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await api.deleteExpense(id);
      setExpenses(expenses.filter((e) => e._id !== id));
    } catch {
      setError("Failed to delete expense.");
    }
  };

  const handleUpdateBudget = async (amount) => {
    try {
      const data = await api.updateBudget(amount);
      setBudget(data.amount);
    } catch {
      setError("Failed to update budget.");
    }
  };

  // Calculations happen automatically every time expenses or budget change
  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const remainingBalance = budget - totalExpenses;

  return (
    <>
      <Header />
      <main id="home" className="container">
        <div className="page-title">
          <h1>Dashboard</h1>
          <p className="muted">Track your monthly budget and spending.</p>
        </div>

        {error && (
          <div className="alert" onClick={() => setError("")}>
            {error}
          </div>
        )}

        <SummaryCards budget={budget} total={totalExpenses} remaining={remainingBalance} />

        <div className="layout">
          <div className="stack">
            <BudgetForm budget={budget} onSave={handleUpdateBudget} />
            <ExpenseForm onAdd={handleAddExpense} />
          </div>
          <ExpenseTable expenses={expenses} onDelete={handleDeleteExpense} />
        </div>

        <About />
      </main>
      <footer className="footer">Expense Tracker · Built with MongoDB, Express, React &amp; Node.js</footer>
    </>
  );
}

export default App;
