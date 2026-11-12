// All calls to the Express backend live here
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export const getExpenses = () => API.get("/expenses").then((res) => res.data);
export const addExpense = (expense) => API.post("/expenses", expense).then((res) => res.data);
export const deleteExpense = (id) => API.delete(`/expenses/${id}`).then((res) => res.data);

export const getBudget = () => API.get("/budget").then((res) => res.data);
export const updateBudget = (amount) => API.put("/budget", { amount }).then((res) => res.data);
