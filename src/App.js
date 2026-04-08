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
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleImportant = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, important: !todo.important } : todo
      )
    );
  };

  const handleEdit = (id, name) => {
    setEditingId(id);
    setEditText(name);
  };

  const handleUpdate = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, name: editText } : todo
      )
    );
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
    <div className="App" style={{ fontFamily: 'Arial', padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>To-Do List</h2>

      {/* Input and Add Task */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter To-Do"
          style={{ padding: '10px', width: '70%' }}
        />
        <button onClick={handleAddTodo} style={{ padding: '10px 15px', marginLeft: '10px' }}>
          + Add Task
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Tasks..."
        style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
      />

      {/* Filter Buttons */}
      <div style={{ marginBottom: '20px' }}>
        {['All', 'Pending', 'Completed', 'Important'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              marginRight: '10px',
              padding: '8px 12px',
              backgroundColor: filter === cat ? '#61dafb' : '#eee',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Task List */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            style={{
              padding: '10px',
              marginBottom: '10px',
              backgroundColor: '#f9f9f9',
              borderRadius: '5px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FaCheckCircle
                onClick={() => handleToggleImportant(todo.id)}
                style={{
                  marginRight: '10px',
                  color: todo.important ? 'green' : '#ccc',
                  cursor: 'pointer',
                }}
              />
              {editingId === todo.id ? (
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onBlur={() => handleUpdate(todo.id)}
                  onKeyDown={(e) => e.key === 'Enter' && handleUpdate(todo.id)}
                  autoFocus
                />
              ) : (
                <span
                  onClick={() => handleToggleComplete(todo.id)}
                  style={{
                    textDecoration: todo.complete ? 'line-through' : 'none',
                    color: todo.complete ? '#888' : '#000',
                    cursor: 'pointer',
                  }}
                >
                  {todo.name}
                </span>
              )}
            </div>
            <div>
              <FaEdit
                onClick={() => handleEdit(todo.id, todo.name)}
                style={{ cursor: 'pointer', marginRight: '10px' }}
              />
              <FaTrash
                onClick={() => handleDelete(todo.id)}
                style={{ cursor: 'pointer', color: 'red' }}
              />
            </div>
          </li>
        ))}
      </ul>

      {/* Bottom Controls */}
      <div style={{ marginTop: '30px' }}>
        <button onClick={handleRefresh} style={{ marginRight: '10px', padding: '8px' }}>
          <FaSyncAlt /> Refresh
        </button>
        <button onClick={handleClearCompleted} style={{ padding: '8px' }}>
          Clear Completed
        </button>
        <div style={{ marginTop: '15px' }}>
          <p>Total: {totalTasks} | Pending: {pendingTasks} | Important: {importantTasks}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
