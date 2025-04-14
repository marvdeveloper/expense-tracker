import { useState } from 'react';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([
    { description: 'Groceries', amount: 50, category: 'Food' },
    { description: 'Uber', amount: 20, category: 'Transport' },
    { description: 'Book', amount: 15, category: 'Education' }
  ]);

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleAddExpense = () => {
    if (description && amount && category) {
      const newExpense = { description, amount: parseFloat(amount), category };
      setExpenses([...expenses, newExpense]);
      setDescription('');
      setAmount('');
      setCategory('');
    }
  };

  const handleDelete = (indexToDelete) => {
    const updatedExpenses = expenses.filter((_, index) => index !== indexToDelete);
    setExpenses(updatedExpenses);
  };

  const sortExpenses = (expenses) => {
    if (!sortBy) return expenses;
    return [...expenses].sort((a, b) => {
      const valA = a[sortBy].toLowerCase();
      const valB = b[sortBy].toLowerCase();
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const filteredExpenses = sortExpenses(
    expenses
      .filter((expense) =>
        expense.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((expense) =>
        filterCategory === 'All' ? true : expense.category === filterCategory
      )
  );

  const uniqueCategories = ['All', ...new Set(expenses.map((e) => e.category))];

  return (
    <div className="App">
      <h1>Expense Tracker</h1>

      {/* Form */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button onClick={handleAddExpense}>Add Expense</button>
      </div>

      {/* Filters and Search */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search by description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '0.5rem', marginRight: '1rem' }}
        />
        <label>Filter by category: </label>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          {uniqueCategories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Sorting */}
      <div style={{ marginBottom: '1rem' }}>
        <label>Sort by: </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ marginRight: '1rem' }}
        >
          <option value="">None</option>
          <option value="description">Description</option>
          <option value="category">Category</option>
        </select>

        <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
          Toggle Order ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
        </button>
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount ($)</th>
            <th>Category</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.description}</td>
              <td>{expense.amount}</td>
              <td>{expense.category}</td>
              <td>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
