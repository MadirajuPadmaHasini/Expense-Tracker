import { useState } from "react";
import { Plus } from "lucide-react";
import { CATEGORIES } from "../utils.js";

const today = () => new Date().toISOString().slice(0, 10);

function ExpenseForm({ onAdd }) {
  const [form, setForm] = useState({ name: "", amount: "", category: "Food", date: today() });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.amount || Number(form.amount) <= 0 || !form.date) {
      setError("Please fill all fields with a valid amount.");
      return;
    }
    onAdd({ ...form, name: form.name.trim(), amount: Number(form.amount) });
    setForm({ name: "", amount: "", category: "Food", date: today() });
    setError("");
  };

  return (
    <div className="card">
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Expense Name
          <input name="name" type="text" placeholder="e.g. Lunch" value={form.name} onChange={handleChange} />
        </label>
        <div className="row">
          <label>
            Amount (₹)
            <input name="amount" type="number" min="0" placeholder="0" value={form.amount} onChange={handleChange} />
          </label>
          <label>
            Category
            <select name="category" value={form.category} onChange={handleChange}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>
        <label>
          Date
          <input name="date" type="date" value={form.date} onChange={handleChange} />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn full"><Plus size={16} /> Add Expense</button>
      </form>
    </div>
  );
}

export default ExpenseForm;
