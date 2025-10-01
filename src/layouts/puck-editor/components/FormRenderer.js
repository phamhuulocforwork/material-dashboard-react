import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Render } from "@measured/puck";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import MDBox from "components/MDBox";

function FormRenderer({ config, data, onFormSubmit }) {
  const [formData, setFormData] = useState({});

  const enhancedConfig = {
    ...config,
    components: Object.entries(config.components).reduce((acc, [key, component]) => {
      acc[key] = {
        ...component,
        render: (props) => {
          const originalComponent = component.render(props);

          // Clone the component with additional props for form handling
          return React.cloneElement(originalComponent, {
            ...originalComponent.props,
            isPreview: true,
            onValueChange: (fieldName, value) => {
              const fieldKey = fieldName.toLowerCase().replace(/\s+/g, "_");
              setFormData((prev) => ({
                ...prev,
                [fieldKey]: value,
              }));
            },
          });
        },
      };
      return acc;
    }, {}),
    root: {
      ...config.root,
      render: ({ children }) => {
        const originalRoot = config.root.render({ children });

        return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onFormSubmit(formData);
            }}
          >
            {originalRoot}
            <MDBox mt={3}>
              <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
                Submit Form
              </Button>
            </MDBox>
          </form>
        );
      },
    },
  };

  return (
    <Box>
      <Render config={enhancedConfig} data={data} />

      {Object.keys(formData).length > 0 && (
        <Paper elevation={2} sx={{ mt: 2, p: 2, bgcolor: "grey.50" }}>
          <Typography variant="h6" gutterBottom>
            Current Form Values:
          </Typography>
          <Box
            component="pre"
            sx={{
              fontSize: "0.875rem",
              fontFamily: "monospace",
              overflow: "auto",
              whiteSpace: "pre-wrap",
            }}
          >
            {JSON.stringify(formData, null, 2)}
          </Box>
        </Paper>
      )}
    </Box>
  );
}

FormRenderer.propTypes = {
  config: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

export default FormRenderer;
