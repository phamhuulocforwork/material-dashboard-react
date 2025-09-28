import Grid from "@mui/material/Grid";
import TodoList from "layouts/todo/components/TodoList";

function Todo() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TodoList />
      </Grid>
    </Grid>
  );
}

export default Todo;
