import React from 'react';
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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useUsers } from 'contexts/UserContext';

const UserTable = () => {
  const {
    loading,
    showLoading,
    paginatedUsers,
    filteredAndSortedUsers,
    page,
    rowsPerPage,
    sortBy,
    sortOrder,
    handleEditUser,
    handleDeleteUser,
    handleSort,
    handleChangePage,
    handleChangeRowsPerPage
  } = useUsers();

  const columns = [
    {
      Header: "ID",
      accessor: "id",
      align: "left",
      sortable: false
    },
    {
      Header: "Họ Tên",
      accessor: "hoTen",
      align: "left",
      sortable: true
    },
    {
      Header: "Email",
      accessor: "email",
      align: "left",
      sortable: true
    },
    {
      Header: "Vai Trò",
      accessor: "vaiTro",
      align: "center",
      sortable: false
    },
    {
      Header: "Thao tác",
      accessor: "actions",
      align: "center",
      sortable: false
    }
  ];

  if (loading && showLoading) {
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
            {paginatedUsers.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                  "&:last-child td": {
                    borderBottom: "none",
                  },
                }}
              >
                {columns.map((column, colIndex) => (
                  <TableCell
                    key={colIndex}
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
                          onClick={() => handleEditUser(row)}
                          size="small"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteUser(row.id)}
                          size="small"
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
            ))}
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
