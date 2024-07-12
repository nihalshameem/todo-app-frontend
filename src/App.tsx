import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResponsiveDrawer from './components/ResponsiveDrawer';
import { Box, Toolbar, Typography } from '@mui/material';

const drawerWidth = 240;

const App: React.FC = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3020/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    try {
      await axios.post('http://localhost:3020/todos/add', { text });
      setText('');
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      await axios.put(`http://localhost:3020/todos/${id}`, { completed });
      fetchTodos();
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3020/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="App">
      <Box sx={{ display: 'flex' }}>
        <ResponsiveDrawer />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar />
          <div className="main">
            <h1>Todo App</h1>
            <div>
              <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
              <button onClick={addTodo}>Add Todo</button>
            </div>
            <ul>
              {todos.map(todo => (
                <li key={todo._id}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo._id, !todo.completed)}
                  />
                  <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
                  <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default App;
