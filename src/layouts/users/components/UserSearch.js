import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { useUsers } from "contexts/UserContext";

const UserSearch = () => {
  const { searchTerm, setSearchTerm } = useUsers();

  return (
    <Box sx={{ px: 3, pb: 2 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Tìm kiếm theo first name, last name hoặc email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "white",
            "& fieldset": {
              borderColor: "#e0e0e0",
            },
            "&:hover fieldset": {
              borderColor: "#1976d2",
            },
          },
        }}
      />
    </Box>
  );
};

export default UserSearch;
