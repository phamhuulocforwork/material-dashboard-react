import React, { useState, useEffect } from 'react';
import TextField from "@mui/material/TextField";
import MDButton from "components/MDButton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useUsers } from 'contexts/UserContext';


const UserForm = ({ onSuccess }) => {
  const {
    formData,
    editingUser,
    handleInputChange,
    handleAddUser,
    handleSaveEdit,
    handleCancelEdit
  } = useUsers();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!formData.hoTen.trim()) {
      errors.hoTen = "Họ tên là bắt buộc";
    } else if (formData.hoTen.trim().length < 2) {
      errors.hoTen = "Họ tên phải có ít nhất 2 ký tự";
    }

    if (!formData.email.trim()) {
      errors.email = "Email là bắt buộc";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = "Email không hợp lệ";
      }
    }

    if (!formData.vaiTro || formData.vaiTro.trim() === "") {
      errors.vaiTro = "Vai trò là bắt buộc";
    } else if (formData.vaiTro.trim().length < 2) {
      errors.vaiTro = "Vai trò phải có ít nhất 2 ký tự";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (editingUser) {
        handleSaveEdit();
      } else {
        handleAddUser();
      }

      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 100);
    } catch (err) {
      const errorMessage = editingUser
        ? "Đã xảy ra lỗi khi cập nhật người dùng. Vui lòng thử lại."
        : "Đã xảy ra lỗi khi thêm người dùng. Vui lòng thử lại.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (field) => (event) => {
    handleInputChange(event);
    if (formErrors[field]) {
      setFormErrors({ ...formErrors, [field]: "" });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="hoTen"
            label="Họ Tên"
            variant="outlined"
            value={formData.hoTen}
            onChange={handleFieldChange('hoTen')}
            error={!!formErrors.hoTen}
            helperText={formErrors.hoTen}
            disabled={loading}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            value={formData.email}
            onChange={handleFieldChange('email')}
            error={!!formErrors.email}
            helperText={formErrors.email}
            disabled={loading}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            name="vaiTro"
            label="Vai Trò"
            variant="outlined"
            value={formData.vaiTro}
            onChange={handleFieldChange('vaiTro')}
            error={!!formErrors.vaiTro}
            disabled={loading}
            placeholder="User, Admin"
          />
        </Grid>
      </Grid>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2,
          mt: 4,
        }}
      >
        <MDButton
          variant="outlined"
          color="error"
          onClick={() => {
            handleCancelEdit();
            if (onSuccess) onSuccess();
          }}
          disabled={loading}
        >
          HỦY
        </MDButton>

        {loading ? (
          <MDButton
            variant="gradient"
            color="success"
            disabled
            startIcon={<CircularProgress size={16} color="inherit" />}
          >
            {editingUser ? "Đang cập nhật..." : "Đang thêm..."}
          </MDButton>
        ) : (
          <MDButton
            type="submit"
            variant="gradient"
            color="success"
          >
            {editingUser ? "CẬP NHẬT" : "THÊM"}
          </MDButton>
        )}
      </Box>
    </Box>
  );
};

export default UserForm;
