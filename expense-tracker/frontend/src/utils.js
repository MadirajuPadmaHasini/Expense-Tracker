export const CATEGORIES = ["Food", "Travel", "Shopping", "Education", "Entertainment", "Others"];

// Format a number as Indian Rupees, e.g. 10000 -> ₹10,000
export const formatINR = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);

export const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
