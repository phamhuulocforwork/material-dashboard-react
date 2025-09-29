import React from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useUsers } from 'contexts/UserContext';

const UserTable = () => {
  const { filteredUsers, handleEditUser, handleDeleteUser } = useUsers();

  const columns = [
    {
      Header: "ID",
      accessor: "id",
      align: "left"
    },
    {
      Header: "Họ Tên",
      accessor: "hoTen",
      align: "left"
    },
    {
      Header: "Email",
      accessor: "email",
      align: "left"
    },
    {
      Header: "Vai Trò",
      accessor: "vaiTro",
      align: "center"
    },
    {
      Header: "Thao tác",
      accessor: "actions",
      align: "center"
    }
  ];

  return (
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
                {column.Header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.map((row, rowIndex) => (
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
  );
};

export default UserTable;
