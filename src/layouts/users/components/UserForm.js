import React from 'react';
import TextField from "@mui/material/TextField";
import MDButton from "components/MDButton";
import Box from "@mui/material/Box";
import { useUsers } from 'contexts/UserContext';

const UserForm = () => {
  const {
    formData,
    editingUser,
    handleInputChange,
    handleAddUser,
    handleSaveEdit,
    handleCancelEdit
  } = useUsers();

  return (
    <Box sx={{ mb: 3, px: 2, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
      <TextField
        name="hoTen"
        label="Họ Tên"
        variant="outlined"
        value={formData.hoTen}
        onChange={handleInputChange}
        sx={{ minWidth: 200 }}
      />
      <TextField
        name="email"
        label="Email"
        variant="outlined"
        value={formData.email}
        onChange={handleInputChange}
        sx={{ minWidth: 250 }}
      />
      <TextField
        name="vaiTro"
        label="Vai Trò"
        variant="outlined"
        value={formData.vaiTro}
        onChange={handleInputChange}
        sx={{ minWidth: 150 }}
      />
      {editingUser ? (
        <>
          <MDButton
            variant="gradient"
            color="success"
            onClick={handleSaveEdit}
          >
            Lưu
          </MDButton>
          <MDButton
            variant="gradient"
            color="error"
            onClick={handleCancelEdit}
          >
            Hủy
          </MDButton>
        </>
      ) : (
        <MDButton variant="gradient" color="success" onClick={handleAddUser}>
          Thêm
        </MDButton>
      )}
    </Box>
  );
};

export default UserForm;
