import { useState } from "react";
import { formatINR } from "../utils.js";

function BudgetForm({ budget, onSave }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === "" || Number(value) < 0) return;
    onSave(Number(value));
    setValue("");
  };

  return (
    <div className="card">
      <h2>Monthly Budget</h2>
      <p className="muted small">Current budget: {formatINR(budget)}</p>
      <form onSubmit={handleSubmit} className="inline-form">
        <input
          type="number"
          min="0"
          placeholder="Amount in ₹"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" className="btn">{budget > 0 ? "Update Budget" : "Set Budget"}</button>
      </form>
    </div>
  );
}

export default BudgetForm;
