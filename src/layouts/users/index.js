import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Users() {
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
    }
  ];

  const users = [
    {
      id: 1,
      hoTen: "Nguyễn Văn A",
      email: "nguyenvana@gmail.com",
      vaiTro: "Admin"
    },
    {
      id: 2,
      hoTen: "Trần Thị B",
      email: "tranthib@gmail.com",
      vaiTro: "User"
    }
  ];

  const rows = users;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Danh sách Người dùng
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
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
                          color: "#6c757d",
                          padding: "0.65rem",
                        }}
                      >
                        {column.Header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, rowIndex) => (
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
                          }}
                        >
                          {row[column.accessor]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Users;