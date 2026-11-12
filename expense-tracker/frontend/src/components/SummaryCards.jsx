import { PiggyBank, ReceiptIndianRupee, Scale } from "lucide-react";
import { formatINR } from "../utils.js";

function SummaryCards({ budget, total, remaining }) {
  const cards = [
    { label: "Total Budget", value: budget, icon: <PiggyBank size={20} />, tone: "green" },
    { label: "Total Expenses", value: total, icon: <ReceiptIndianRupee size={20} />, tone: "red" },
    { label: "Remaining Balance", value: remaining, icon: <Scale size={20} />, tone: remaining < 0 ? "red" : "green" },
  ];

  return (
    <div className="summary-grid">
      {cards.map((card) => (
        <div key={card.label} className="card">
          <div className="summary-top">
            <p className="muted">{card.label}</p>
            <span className={`icon-badge ${card.tone}`}>{card.icon}</span>
          </div>
          <p className={`summary-value ${card.value < 0 ? "negative" : ""}`}>{formatINR(card.value)}</p>
        </div>
      ))}
    </div>
  );
}

export default SummaryCards;
