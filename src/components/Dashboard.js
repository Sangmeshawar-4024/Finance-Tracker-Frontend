import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "../styles/responsive-dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({
    type: "",
    amount: "",
    category: "",
    description: "",
    date: "",
  });
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editTransaction, setEditTransaction] = useState(null);

  const calculateSummary = (txList) => {
    let totalBalance = 0;
    let incomeTotal = 0;
    let expenseTotal = 0;

    txList.forEach((tx) => {
      if (tx.type === "income") {
        incomeTotal += tx.amount;
        totalBalance += tx.amount;
      } else if (tx.type === "expense") {
        expenseTotal += tx.amount;
        totalBalance -= tx.amount;
      }
    });

    setBalance(totalBalance);
    setIncome(incomeTotal);
    setExpenses(expenseTotal);
  };

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions(res.data);
      calculateSummary(res.data);
    } catch (err) {
      console.error(err);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    setName(storedName || "User");
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      type: "",
      amount: "",
      category: "",
      description: "",
      date: "",
    });
    setEditMode(false);
    setEditTransaction(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (editMode && editTransaction) {
        const res = await api.put(`/transactions/${editTransaction._id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const updated = transactions.map((tx) =>
          tx._id === editTransaction._id ? res.data : tx
        );
        setTransactions(updated);
        calculateSummary(updated);
      } else {
        const res = await api.post("/transactions", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const updated = [...transactions, res.data];
        setTransactions(updated);
        calculateSummary(updated);
      }

      resetForm();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const newTx = transactions.filter((tx) => tx._id !== id);
      setTransactions(newTx);
      calculateSummary(newTx);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (tx) => {
    setForm({
      type: tx.type,
      amount: tx.amount,
      category: tx.category,
      description: tx.description,
      date: tx.date.split("T")[0], 
    });
    setEditTransaction(tx);
    setEditMode(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-left">
        <h1>Welcome Back, {name} 👋</h1>
        <p>
          The Finance Tracker Dashboard gives you a clear, real-time overview
          of your income, expenses, savings, and financial trends — all in one
          place.
        </p>
        <p className="balance">
          Your Balance: <strong>$ {balance}</strong>
        </p>
        <p>💰 Income: $ {income} | 💸 Expense: $ {expenses}</p>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard-right">
        <form className="add-form" onSubmit={handleSubmit}>
          <h1>{editMode ? "Update Transaction" : "Add Transaction"}</h1>
          {error && <p className="error">{error}</p>}
          <label>Type</label>
          <select name="type" value={form.type} onChange={handleChange} required>
            <option value="">Select Type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <label>Amount</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            required
          />

          <label>Category</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="e.g. Food, Rent, Salary"
            required
          />

          <label>Description</label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Short description"
            required
          />

          <label>Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />

          <button type="submit" className="add-btn">
            {editMode ? "Update Transaction" : "Add Transaction"}
          </button>
          {editMode && (
            <button type="button" className="cancel-btn" onClick={resetForm}>
              Cancel Edit
            </button>
          )}
        </form>

        <div className="transactions-list">
          <h3>Transactions :</h3>
          <ul>
            {transactions.map((tx) => (
              <li key={tx._id}>
                <strong>{tx.type}</strong> - {tx.category} : ${tx.amount} on{" "}
                {tx.date.split("T")[0]} — {tx.description}
                <button className="edit-btn" onClick={() => handleEdit(tx)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(tx._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
