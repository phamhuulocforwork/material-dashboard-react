import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { UserProvider, useUsers } from "contexts/UserContext";
import UserSearch from "./components/UserSearch";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import UserModal from "./components/UserModal";
import MDButton from "components/MDButton";

const UsersContent = () => {
  const { modalOpen, modalTitle, openCreateModal, closeModal, snackbar, closeSnackbar } = useUsers();

  return (
    <>
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
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <MDTypography variant="h6" color="white">
                    Danh sách Người dùng
                  </MDTypography>
                  <MDButton
                    variant="contained"
                    color="white"
                    size="small"
                    onClick={openCreateModal}
                  >
                    + Thêm người dùng
                  </MDButton>
                </MDBox>
                <MDBox pt={3}>
                  <UserSearch />
                  <UserTable />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </DashboardLayout>
      <UserModal
        open={modalOpen}
        onClose={closeModal}
        title={modalTitle}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          variant="standard"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

function Users() {
  return (
    <UserProvider>
      <UsersContent />
    </UserProvider>
  );
}

export default Users;