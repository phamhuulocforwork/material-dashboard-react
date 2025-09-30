import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useUsers } from "contexts/UserContext";

const UserTable = () => {
  const { loading, users, page, totalPages, openEditModal, handleDeleteUser, handleChangePage } =
    useUsers();

  const columns = [
    {
      Header: "ID",
      accessor: "id",
      align: "center",
      width: "80px",
    },
    {
      Header: "Avatar",
      accessor: "avatar",
      align: "center",
      width: "80px",
    },
    {
      Header: "First Name",
      accessor: "first_name",
      align: "left",
    },
    {
      Header: "Last Name",
      accessor: "last_name",
      align: "left",
    },
    {
      Header: "Email",
      accessor: "email",
      align: "left",
    },
    {
      Header: "Thao tác",
      accessor: "actions",
      align: "center",
      width: "150px",
    },
  ];

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 4,
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
                    width: column.width || "auto",
                  }}
                >
                  {column.Header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow
                key={`view-${row.id}`}
                sx={{
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                  "&:last-child td": {
                    borderBottom: "none",
                  },
                }}
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
                    {column.accessor === "avatar" ? (
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Avatar
                          src={row.avatar}
                          alt={`${row.first_name} ${row.last_name}`}
                          sx={{ width: 40, height: 40 }}
                        />
                      </Box>
                    ) : column.accessor === "actions" ? (
                      <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                        <IconButton
                          color="primary"
                          onClick={() => openEditModal(row)}
                          size="small"
                          title="Chỉnh sửa"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteUser(row.id)}
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[6]}
        component="div"
        count={totalPages * 6}
        rowsPerPage={6}
        page={page}
        onPageChange={handleChangePage}
        labelDisplayedRows={({ from, to, count }) => `Trang ${page + 1} của ${totalPages}`}
      />
    </Box>
  );
};

export default UserTable;
