import React, { useState } from 'react';
import './App.css';
import { FaTrash, FaEdit, FaCheckCircle, FaSyncAlt } from 'react-icons/fa';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim() === '') return;
    setTodos([
      ...todos,
      {
        id: Date.now(),
        name: newTodo.trim(),
        complete: false,
        important: false,
      },
    ]);
    setNewTodo('');
  };

  const handleToggleComplete = (id) => {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, complete: !todo.complete } : todo
    ));
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleImportant = (id) => {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, important: !todo.important } : todo
    ));
  };

  const handleEdit = (id, name) => {
    setEditingId(id);
    setEditText(name);
  };

  const handleUpdate = (id) => {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, name: editText } : todo
    ));
    setEditingId(null);
    setEditText('');
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.complete));
  };

  const handleRefresh = () => {
    setTodos([]);
    setNewTodo('');
    setSearchTerm('');
    setFilter('All');
    setEditingId(null);
    setEditText('');
  };

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === 'All' ||
      (filter === 'Pending' && !todo.complete) ||
      (filter === 'Completed' && todo.complete) ||
      (filter === 'Important' && todo.important);
    return matchesSearch && matchesFilter;
  });

  const totalTasks = todos.length;
  const pendingTasks = todos.filter((t) => !t.complete).length;
  const importantTasks = todos.filter((t) => t.important).length;

  return (
    <div className="App">
      <h2>To-Do List</h2>

      {/* Input and Add Task */}
      <div className="input-row">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
          placeholder="Enter To-Do"
        />
        <button onClick={handleAddTodo}>+ Add Task</button>
      </div>

      {/* Search */}
      <input
        type="text"
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Tasks..."
      />

      {/* Filter Buttons */}
      <div className="filter-buttons">
        {['All', 'Pending', 'Completed', 'Important'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={filter === cat ? 'active' : ''}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Task List */}
      <ul>
        {filteredTodos.length === 0 && (
          <p className="empty-state">No tasks found. Add one above! 🎉</p>
        )}
        {filteredTodos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <div className="todo-left">
              <FaCheckCircle
                onClick={() => handleToggleImportant(todo.id)}
                style={{ color: todo.important ? 'green' : '#ccc', cursor: 'pointer' }}
              />
              {editingId === todo.id ? (
                <input
                  className="edit-input"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onBlur={() => handleUpdate(todo.id)}
                  onKeyDown={(e) => e.key === 'Enter' && handleUpdate(todo.id)}
                  autoFocus
                />
              ) : (
                <span
                  className={`todo-text ${todo.complete ? 'completed' : ''}`}
                  onClick={() => handleToggleComplete(todo.id)}
                >
                  {todo.name}
                </span>
              )}
            </div>
            <div className="todo-actions">
              <FaEdit
                className="edit-icon"
                onClick={() => handleEdit(todo.id, todo.name)}
              />
              <FaTrash
                className="delete-icon"
                onClick={() => handleDelete(todo.id)}
              />
            </div>
          </li>
        ))}
      </ul>

      {/* Bottom Controls */}
      <div className="bottom-controls">
        <button onClick={handleRefresh}>
          <FaSyncAlt /> Refresh
        </button>
        <button onClick={handleClearCompleted}>
          Clear Completed
        </button>
      </div>

      {/* Stats */}
      <div className="stats">
        <p>Total: {totalTasks} | Pending: {pendingTasks} | Important: {importantTasks}</p>
      </div>
    </div>
  );
}

export default App;
