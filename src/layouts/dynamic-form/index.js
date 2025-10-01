/*
=========================================================
* Material Dashboard 2 React - Dynamic Form with Puck Editor
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React, { useState } from "react";
import { Puck, Render } from "@measured/puck";
import "@measured/puck/puck.css";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Form block components
import DropdownBlock from "./components/DropdownBlock";
import RadioBlock from "./components/RadioBlock";
import FormRenderer from "./components/FormRenderer";

// Puck configuration
const config = {
  components: {
    DropdownBlock: {
      fields: {
        label: {
          type: "text",
        },
        options: {
          type: "array",
          arrayFields: {
            value: { type: "text" },
          },
          defaultItemProps: {
            value: "Option",
          },
          getItemSummary: (item) => item.value || "Option",
        },
        defaultValue: {
          type: "text",
        },
      },
      defaultProps: {
        label: "Dropdown Field",
        options: [{ value: "Option 1" }, { value: "Option 2" }, { value: "Option 3" }],
        defaultValue: "",
      },
      render: ({ label, options, defaultValue, puck }) => {
        return (
          <DropdownBlock
            label={label}
            options={options}
            defaultValue={defaultValue}
            isPreview={puck?.isEditing === false}
          />
        );
      },
    },
    RadioBlock: {
      fields: {
        label: {
          type: "text",
        },
        options: {
          type: "array",
          arrayFields: {
            value: { type: "text" },
          },
          defaultItemProps: {
            value: "Option",
          },
          getItemSummary: (item) => item.value || "Option",
        },
        defaultValue: {
          type: "text",
        },
      },
      defaultProps: {
        label: "Radio Field",
        options: [{ value: "Option 1" }, { value: "Option 2" }, { value: "Option 3" }],
        defaultValue: "",
      },
      render: ({ label, options, defaultValue, puck }) => {
        return (
          <RadioBlock
            label={label}
            options={options}
            defaultValue={defaultValue}
            isPreview={puck?.isEditing === false}
          />
        );
      },
    },
  },
  root: {
    render: ({ children }) => {
      return <div style={{ padding: "20px" }}>{children}</div>;
    },
  },
};

// Initial data
const initialData = {
  content: [],
  root: {},
};

function DynamicForm() {
  const [data, setData] = useState(initialData);
  const [isPreview, setIsPreview] = useState(false);
  const [formData, setFormData] = useState({});

  const handleSave = (newData) => {
    setData(newData);
  };

  const handleFormSubmit = (submittedData) => {
    console.log("Form submitted with data:", submittedData);
    setFormData(submittedData);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <MDTypography variant="h4">Dynamic Form Builder with Puck Editor</MDTypography>
                  <Button
                    variant="contained"
                    color={isPreview ? "secondary" : "primary"}
                    onClick={() => setIsPreview(!isPreview)}
                  >
                    {isPreview ? "Edit Mode" : "Preview Mode"}
                  </Button>
                </MDBox>

                <Box sx={{ minHeight: "500px" }}>
                  {isPreview ? (
                    <div>
                      <Typography variant="h6" gutterBottom>
                        Form Preview
                      </Typography>
                      <FormRenderer config={config} data={data} onFormSubmit={handleFormSubmit} />
                      {Object.keys(formData).length > 0 && (
                        <Box mt={3} p={2} bgcolor="success.light" borderRadius={1}>
                          <Typography variant="h6" gutterBottom color="success.dark">
                            ✅ Form Submitted Successfully!
                          </Typography>
                          <Typography variant="body2" color="success.dark">
                            <strong>Submitted Data:</strong>
                          </Typography>
                          <Box
                            component="pre"
                            sx={{
                              fontSize: "0.875rem",
                              fontFamily: "monospace",
                              mt: 1,
                              p: 2,
                              bgcolor: "white",
                              borderRadius: 1,
                              overflow: "auto",
                            }}
                          >
                            {JSON.stringify(formData, null, 2)}
                          </Box>
                        </Box>
                      )}
                    </div>
                  ) : (
                    <Puck config={config} data={data} onPublish={handleSave} />
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default DynamicForm;
