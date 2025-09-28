import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  TextField,
  Button,
  Typography,
  IconButton,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Công việc 1", completed: false },
    { id: 2, text: "Công việc 2", completed: true },
    { id: 3, text: "Công việc 3", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodoItem = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    }
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", padding: 3 }}>
      <Paper elevation={2} sx={{ padding: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Todo List
        </Typography>

        <Box sx={{ display: "flex", gap: 1, marginBottom: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddTodo()}
          />
          <Button variant="contained" onClick={handleAddTodo} disabled={!newTodo.trim()}>
            Thêm
          </Button>
        </Box>

        <List>
          {todos.map((todo) => (
            <ListItem
              key={todo.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
              sx={{
                textDecoration: todo.completed ? "line-through" : "none",
                opacity: todo.completed ? 0.6 : 1,
              }}
            >
              <Checkbox
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
                color="primary"
              />
              <ListItemText primary={todo.text} />
            </ListItem>
          ))}
        </List>

        {todos.length === 0 && (
          <Typography variant="body1" align="center" sx={{ marginTop: 3, color: "text.secondary" }}>
            Không có công việc nào. Hãy thêm công việc đầu tiên!
          </Typography>
        )}
      </Paper>
    </Box>
  );
}

export default TodoList;
