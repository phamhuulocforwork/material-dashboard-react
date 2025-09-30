import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useUsers } from 'contexts/UserContext';

const InlineEditSchema = Yup.object().shape({
  hoTen: Yup.string()
    .min(3, 'Tối thiểu 3 ký tự')
    .max(50, 'Tối đa 50 ký tự')
    .required('Bắt buộc'),
  email: Yup.string()
    .email('Email không hợp lệ')
    .required('Bắt buộc'),
  vaiTro: Yup.string()
    .test('is-valid-role', 'Không hợp lệ', function(value) {
      if (!value) return false;
      return ['Admin', 'User'].includes(value);
    })
    .required('Bắt buộc'),
  ngaySinh: Yup.date()
    .required('Bắt buộc')
    .test('age', 'Tuổi phải ≥ 18', function(value) {
      if (!value) return false;
      const today = new Date();
      const birthDate = new Date(value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      return age >= 18;
    })
    .max(new Date(), 'Không thể là ngày tương lai')
});

const UserTable = () => {
  const {
    loading,
    paginatedUsers,
    filteredAndSortedUsers,
    page,
    rowsPerPage,
    sortBy,
    sortOrder,
    openEditModal,
    handleDeleteUser,
    handleUpdateUser,
    handleSort,
    handleChangePage,
    handleChangeRowsPerPage
  } = useUsers();

  const [editingRowId, setEditingRowId] = useState(null);

  const columns = [
    {
      Header: "ID",
      accessor: "id",
      align: "left",
      sortable: false,
      width: "80px"
    },
    {
      Header: "Họ Tên",
      accessor: "hoTen",
      align: "left",
      sortable: true,
      editable: true
    },
    {
      Header: "Email",
      accessor: "email",
      align: "left",
      sortable: true,
      editable: true
    },
    {
      Header: "Vai Trò",
      accessor: "vaiTro",
      align: "center",
      sortable: false,
      editable: true,
      type: "select",
      options: ['Admin', 'User']
    },
    {
      Header: "Ngày Sinh",
      accessor: "ngaySinh",
      align: "center",
      sortable: false,
      editable: true,
      type: "date"
    },
    {
      Header: "Thao tác",
      accessor: "actions",
      align: "center",
      sortable: false,
      width: "150px"
    }
  ];

  const handleStartEdit = (userId) => {
    setEditingRowId(userId);
  };

  const handleCancelEdit = () => {
    setEditingRowId(null);
  };

  const handleSaveEdit = async (userId, values) => {
    const success = await handleUpdateUser(userId, values);
    if (success) {
      setEditingRowId(null);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 4
        }}
      >
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Đang tải dữ liệu...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <TableContainer component={Paper} elevation={0}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ width: "100%", display: "table-header-group" }}>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  align={column.align}
                  sx={{
                    borderBottom: "1px solid #e0e0e0",
                    backgroundColor: "#f8f9fa",
                    fontWeight: "bold",
                    fontSize: "0.875rem",
                    textTransform: "uppercase",
                    color: "#495057",
                    padding: "0.65rem",
                    width: column.width || 'auto'
                  }}
                >
                  {column.sortable ? (
                    <TableSortLabel
                      active={sortBy === column.accessor}
                      direction={sortBy === column.accessor ? sortOrder : 'asc'}
                      onClick={() => handleSort(column.accessor)}
                    >
                      {column.Header}
                    </TableSortLabel>
                  ) : (
                    column.Header
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((row) => {
              const isEditing = editingRowId === row.id;

              if (isEditing) {
                return (
                  <Formik
                    key={row.id}
                    initialValues={{
                      hoTen: row.hoTen || '',
                      email: row.email || '',
                      vaiTro: row.vaiTro || '',
                      ngaySinh: row.ngaySinh || ''
                    }}
                    validationSchema={InlineEditSchema}
                    onSubmit={(values, { setSubmitting }) => {
                      handleSaveEdit(row.id, values);
                      setSubmitting(false);
                    }}
                  >
                    {({ values, errors, touched, handleChange, handleBlur, isSubmitting, handleSubmit }) => (
                      <TableRow
                        key={`edit-${row.id}`}
                        component="tr"
                        sx={{
                          backgroundColor: "#fffef0",
                          "&:hover": {
                            backgroundColor: "#fffbe6",
                          },
                        }}
                      >
                        {columns.map((column) => (
                          <TableCell
                            key={column.accessor}
                            align={column.align}
                            sx={{
                              borderBottom: "1px solid #e0e0e0",
                              padding: "8px",
                              verticalAlign: "top",
                            }}
                          >
                            {column.accessor === "id" ? (
                              <Typography variant="body2">{row.id}</Typography>
                            ) : column.accessor === "actions" ? (
                              <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                                <IconButton
                                  color="success"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleSubmit();
                                  }}
                                  size="small"
                                  disabled={isSubmitting}
                                  title="Lưu thay đổi"
                                >
                                  <SaveIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                  color="error"
                                  onClick={handleCancelEdit}
                                  size="small"
                                  disabled={isSubmitting}
                                  title="Hủy bỏ"
                                >
                                  <CancelIcon fontSize="small" />
                                </IconButton>
                              </Box>
                            ) : column.editable ? (
                              column.type === "select" ? (
                                <TextField
                                  select
                                  size="small"
                                  fullWidth
                                  name={column.accessor}
                                  value={values[column.accessor]}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={touched[column.accessor] && Boolean(errors[column.accessor])}
                                  helperText={touched[column.accessor] && errors[column.accessor]}
                                  disabled={isSubmitting}
                                  sx={{
                                    minWidth: '120px',
                                    "& .MuiInputBase-root": {
                                      height: 40,
                                    },
                                  }}
                                >
                                  {column.options.map((option) => (
                                    <MenuItem key={option} value={option}>
                                      {option}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              ) : column.type === "date" ? (
                                <TextField
                                  size="small"
                                  fullWidth
                                  type="date"
                                  name={column.accessor}
                                  value={values[column.accessor]}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={touched[column.accessor] && Boolean(errors[column.accessor])}
                                  helperText={touched[column.accessor] && errors[column.accessor]}
                                  disabled={isSubmitting}
                                  InputLabelProps={{ shrink: true }}
                                  sx={{ minWidth: '150px' }}
                                />
                              ) : (
                                <TextField
                                  size="small"
                                  fullWidth
                                  name={column.accessor}
                                  value={values[column.accessor]}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={touched[column.accessor] && Boolean(errors[column.accessor])}
                                  helperText={touched[column.accessor] && errors[column.accessor]}
                                  disabled={isSubmitting}
                                />
                              )
                            ) : (
                              <Typography variant="body2">{row[column.accessor]}</Typography>
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    )}
                  </Formik>
                );
              }

              return (
              <TableRow
                  key={`view-${row.id}`}
                  onDoubleClick={() => handleStartEdit(row.id)}
                sx={{
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                      cursor: "pointer"
                  },
                  "&:last-child td": {
                    borderBottom: "none",
                  },
                }}
                  title="Double-click để chỉnh sửa nhanh"
              >
                  {columns.map((column) => (
                  <TableCell
                      key={column.accessor}
                    align={column.align}
                    sx={{
                      borderBottom: "1px solid #e0e0e0",
                      padding: "16px",
                      fontSize: "0.875rem",
                      color: "#333333",
                    }}
                  >
                    {column.accessor === "actions" ? (
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        <IconButton
                          color="primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              openEditModal(row);
                            }}
                          size="small"
                            title="Chỉnh sửa (mở modal)"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteUser(row.id);
                            }}
                          size="small"
                            title="Xóa người dùng"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    ) : (
                      row[column.accessor]
                    )}
                  </TableCell>
                ))}
              </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredAndSortedUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Số dòng mỗi trang:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} của ${count}`}
      />
    </Box>
  );
};

export default UserTable;