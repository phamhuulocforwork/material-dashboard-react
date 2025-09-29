import React from 'react';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useUsers } from 'contexts/UserContext';

const UserSearch = () => {
  const { searchTerm, setSearchTerm } = useUsers();

  return (
    <Box sx={{ mb: 3, px: 2 }}>
      <TextField
        fullWidth
        label="Tìm kiếm người dùng"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Tìm kiếm theo họ tên, email hoặc vai trò..."
      />
    </Box>
  );
};

export default UserSearch;
