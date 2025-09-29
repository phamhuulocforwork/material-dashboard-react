import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { UserProvider } from "contexts/UserContext";
import UserSearch from "./components/UserSearch";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";

function Users() {
  return (
    <UserProvider>
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
                  <UserSearch />
                  <UserForm />
                  <UserTable />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </DashboardLayout>
    </UserProvider>
  );
}

export default Users;