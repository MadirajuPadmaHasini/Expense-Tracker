import { Trash2 } from "lucide-react";
import { formatDate, formatINR } from "../utils.js";

function ExpenseTable({ expenses, onDelete }) {
  return (
    <div className="card table-card">
      <div className="table-head">
        <h2>Expense History</h2>
        <span className="pill">{expenses.length} items</span>
      </div>

      {expenses.length === 0 ? (
        <p className="empty">No expenses yet. Add your first expense using the form.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Expense Name</th>
                <th>Category</th>
                <th className="right">Amount</th>
                <th>Date</th>
                <th className="right">Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((e) => (
                <tr key={e._id}>
                  <td className="bold">{e.name}</td>
                  <td><span className="tag">{e.category}</span></td>
                  <td className="right bold">{formatINR(e.amount)}</td>
                  <td className="muted">{formatDate(e.date)}</td>
                  <td className="right">
                    <button className="btn-delete" onClick={() => onDelete(e._id)}>
                      <Trash2 size={14} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ExpenseTable;
