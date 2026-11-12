# Expense Tracker (MERN Stack)

A simple, single-page Expense Tracker built with **MongoDB, Express.js, React.js and Node.js**.
All amounts are shown in Indian Rupees (₹).

## Features
- Set / update a monthly budget
- Add expenses (name, amount, category, date)
- View expense history in a table
- Delete expenses
- Total Expenses and Remaining Balance are calculated automatically
- All data is saved in MongoDB and loaded when the app opens

## Folder Structure
```
expense-tracker/
├── backend/
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── models/
│   │   ├── Expense.js          # Expense schema
│   │   └── Budget.js           # Budget schema
│   ├── routes/
│   │   ├── expenseRoutes.js    # /api/expenses endpoints
│   │   └── budgetRoutes.js     # /api/budget endpoints
│   ├── .env.example
│   ├── package.json
│   └── server.js               # Express app entry point
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Header.jsx
    │   │   ├── SummaryCards.jsx
    │   │   ├── BudgetForm.jsx
    │   │   ├── ExpenseForm.jsx
    │   │   ├── ExpenseTable.jsx
    │   │   └── About.jsx
    │   ├── api.js              # Axios calls to the backend
    │   ├── utils.js            # ₹ formatting + categories
    │   ├── App.jsx             # Main dashboard (state + logic)
    │   ├── main.jsx
    │   └── index.css           # Styles
    ├── index.html
    ├── .env.example
    ├── package.json
    └── vite.config.js
```

## REST API Endpoints
| Method | Endpoint              | Description            |
|--------|-----------------------|------------------------|
| GET    | `/api/expenses`       | Get all expenses       |
| POST   | `/api/expenses`       | Add a new expense      |
| DELETE | `/api/expenses/:id`   | Delete an expense      |
| GET    | `/api/budget`         | Get monthly budget     |
| PUT    | `/api/budget`         | Set / update budget    |

Example POST body:
```json
{ "name": "Lunch", "amount": 250, "category": "Food", "date": "2026-11-12" }
```

## Requirements
- Node.js 18 or newer
- MongoDB (installed locally, or a free MongoDB Atlas cluster)

## How to Run Locally

### 1. Start MongoDB
- **Local:** make sure the MongoDB service is running (default `mongodb://127.0.0.1:27017`).
- **Atlas:** create a free cluster and copy its connection string.

### 2. Run the backend
```bash
cd backend
npm install
cp .env.example .env        # on Windows: copy .env.example .env
# edit .env and set MONGO_URI if you use Atlas
npm run dev                 # or: npm start
```
You should see `MongoDB connected` and `Server running on http://localhost:5000`.

### 3. Run the frontend (in a new terminal)
```bash
cd frontend
npm install
cp .env.example .env        # on Windows: copy .env.example .env
npm run dev
```
Open **http://localhost:5173** in your browser.

## How It Works (for viva)
1. When the page loads, `App.jsx` calls `GET /api/expenses` and `GET /api/budget` inside `useEffect`.
2. Adding an expense sends `POST /api/expenses`; Express saves it with Mongoose and returns the saved document, which is added to React state.
3. Deleting sends `DELETE /api/expenses/:id` and removes it from state.
4. Total Expenses = sum of all expense amounts (`reduce`). Remaining Balance = Budget − Total Expenses. These recalculate on every render, so the cards update automatically.
