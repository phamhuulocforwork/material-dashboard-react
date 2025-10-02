import React, { useState } from "react";
import { Puck } from "@measured/puck";
import "@measured/puck/puck.css";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import DropdownBlock from "./components/DropdownBlock";
import RadioBlock from "./components/RadioBlock";
import FormRenderer from "./components/FormRenderer";

const config = {
  components: {
    DropdownBlock: {
      fields: {
        label: {
          type: "text",
          contentEditable: true,
        },
        questionDescription: {
          type: "textarea",
          placeholder: "Enter question description...",
          contentEditable: true,
        },
        options: {
          type: "array",
          arrayFields: {
            value: { type: "text" },
          },
          defaultItemProps: {
            value: "New option",
          },
          getItemSummary: (item) => item.value || "Option",
        },
        defaultValue: {
          type: "text",
        },
      },
      defaultProps: {
        label: "Dropdown",
        questionDescription: "Question Description",
        options: [{ value: "New option 1" }, { value: "New option 2" }],
        defaultValue: "",
      },
      render: ({ label, questionDescription, options, defaultValue, puck }) => {
        return (
          <DropdownBlock
            label={label}
            questionDescription={questionDescription}
            options={options}
            defaultValue={defaultValue}
            isPreview={puck?.isEditing === false}
            puck={puck}
          />
        );
      },
    },
    RadioBlock: {
      fields: {
        label: {
          type: "text",
          contentEditable: true,
        },
        questionDescription: {
          type: "textarea",
          placeholder: "Enter question description...",
          contentEditable: true,
        },
        options: {
          type: "array",
          arrayFields: {
            value: { type: "text" },
          },
          defaultItemProps: {
            value: "New option",
          },
          getItemSummary: (item) => item.value || "Option",
        },
        defaultValue: {
          type: "text",
        },
      },
      defaultProps: {
        label: "Multiple choice",
        questionDescription: "Question Description",
        options: [{ value: "New option 1" }, { value: "New option 2" }, { value: "New option 3" }],
        defaultValue: "",
      },
      render: ({ label, questionDescription, options, defaultValue, puck }) => {
        return (
          <RadioBlock
            label={label}
            questionDescription={questionDescription}
            options={options}
            defaultValue={defaultValue}
            isPreview={puck?.isEditing === false}
            puck={puck}
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

const initialData = {
  content: [],
  root: {},
};

function PuckEditor() {
  const [data, setData] = useState(initialData);
  const [isPreview, setIsPreview] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const handleSave = (newData) => {
    setData(newData);
  };

  const handleFormSubmit = (formData) => {
    console.log("Form submitted with data:", formData);
    setSubmitResult(formData);
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
                  <MDTypography variant="h4">Puck Editor</MDTypography>
                  <MDButton
                    variant="contained"
                    color={isPreview ? "secondary" : "primary"}
                    onClick={() => setIsPreview(!isPreview)}
                  >
                    {isPreview ? "Edit Mode" : "Preview Mode"}
                  </MDButton>
                </MDBox>

                <Box sx={{ minHeight: "500px" }}>
                  {isPreview ? (
                    <>
                      <FormRenderer config={config} data={data} onFormSubmit={handleFormSubmit} />
                      {submitResult && (
                        <Box mt={3} p={2} borderRadius={1}>
                          <Typography variant="body2">
                            <strong>Data:</strong>
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
                              maxHeight: "300px",
                            }}
                          >
                            {JSON.stringify(submitResult, null, 2)}
                          </Box>
                        </Box>
                      )}
                    </>
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

export default PuckEditor;
