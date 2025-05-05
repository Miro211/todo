import { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const add = () => {
    if (!text.trim()) return;
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text, isDone: false },
    ]);
    setText('');
  };

  const remove = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const change = (id) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, isDone: !t.isDone } : t
      )
    );
  };

  const update = (id) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, text: editText } : t
      )
    );
    setEditId(null);
    setEditText('');
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={add}>Add</button>

      <ul>
        {todos.map((t) => (
          <li key={t.id} className={t.isDone ? 'done' : ''}>
            <input
              type="checkbox"
              checked={t.isDone}
              onChange={() => change(t.id)}
            />

            {editId === t.id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') update(t.id);
                }}
                autoFocus
              />
            ) : (
              <span>{t.text}</span>
            )}
          
            <button onClick={() => remove(t.id)}>Delete</button>

            <button
              onClick={() => {
                setEditId(t.id);
                setEditText(t.text);
              }}
            >
              Edit
            </button>
            
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
