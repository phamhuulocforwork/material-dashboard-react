import React, { useState, useEffect } from "react";
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
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    } else {
      setTodos([
        { id: 1, text: "Công việc 1", completed: false },
        { id: 2, text: "Công việc 2", completed: true },
        { id: 3, text: "Công việc 3", completed: false },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
      };
      setTodos([...todos, newTask]);
      setNewTodo("");
      showSnackbar("Đã thêm công việc thành công!");
    }
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    showSnackbar("Đã xóa công việc!");
  };

  const handleEditTodo = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const handleSaveEdit = () => {
    if (editingText.trim() !== "") {
      setTodos(
        todos.map((todo) =>
          todo.id === editingId ? { ...todo, text: editingText.trim() } : todo
        )
      );
      setEditingId(null);
      setEditingText("");
      showSnackbar("Đã cập nhật công việc!");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText("");
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
            onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
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
                editingId === todo.id ? (
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton
                      edge="end"
                      aria-label="save"
                      onClick={handleSaveEdit}
                      color="primary"
                    >
                      <SaveIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="cancel"
                      onClick={handleCancelEdit}
                      color="secondary"
                    >
                      <CancelIcon />
                    </IconButton>
                  </Box>
                ) : (
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleEditTodo(todo.id, todo.text)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteTodo(todo.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                )
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
              {editingId === todo.id ? (
                <TextField
                  fullWidth
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveEdit();
                    if (e.key === "Escape") handleCancelEdit();
                  }}
                  variant="standard"
                  autoFocus
                />
              ) : (
                <ListItemText primary={todo.text} />
              )}
            </ListItem>
          ))}
        </List>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default TodoList;
