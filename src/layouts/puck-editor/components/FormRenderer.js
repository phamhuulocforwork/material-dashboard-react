import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Render } from "@measured/puck";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";

import MDButton from "components/MDButton";

function FormRenderer({ config, data, onFormSubmit }) {
  const [formData, setFormData] = useState({});
  const enhancedConfig = useMemo(
    () => ({
      ...config,
      components: Object.entries(config.components).reduce((acc, [key, component]) => {
        acc[key] = {
          ...component,
          render: (props) => {
            const originalComponent = component.render(props);

            const componentIndex = data.content
              ? data.content.findIndex(
                  (item) =>
                    item.type === key && JSON.stringify(item.props) === JSON.stringify(props)
                )
              : 0;

            const questionNumber = componentIndex + 1;

            return React.cloneElement(originalComponent, {
              ...originalComponent.props,
              isPreview: true,
              questionNumber: questionNumber > 0 ? questionNumber : 1,
              onValueChange: (fieldName, value) => {
                const fieldKey = `question_${questionNumber > 0 ? questionNumber : 1}_${fieldName
                  .toLowerCase()
                  .replace(/\s+/g, "_")}`;
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
          return (
            <Container maxWidth="md">
              <Paper elevation={1} sx={{ p: 3, mt: 2 }}>
                <Typography
                  variant="h5"
                  component="h1"
                  gutterBottom
                  sx={{ mb: 3, fontWeight: 600 }}
                >
                  Preview
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log("Form submitted with data:", formData);
                    if (onFormSubmit) {
                      onFormSubmit(formData);
                    }
                  }}
                >
                  <Box sx={{ mb: 4 }}>{children}</Box>

                  <Divider sx={{ my: 3 }} />

                  <Box display="flex" justifyContent="center">
                    <MDButton
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                    >
                      Submit
                    </MDButton>
                  </Box>
                </form>
              </Paper>
            </Container>
          );
        },
      },
    }),
    [config, data, formData]
  );

  return (
    <Box>
      <Render config={enhancedConfig} data={data} />
    </Box>
  );
}

FormRenderer.propTypes = {
  config: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  onFormSubmit: PropTypes.func,
};

export default FormRenderer;
