import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function DropdownBlock({
  label = "Dropdown",
  questionDescription = "Question Description",
  options = [],
  defaultValue = "",
  isPreview = false,
  questionNumber = 1,
  onValueChange,
  puck,
}) {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);

    if (onValueChange && isPreview) {
      onValueChange(label, value);
    }
  };

  const fieldName = (label || "").toString().toLowerCase().replace(/\s+/g, "_");

  return (
    <MDBox mb={2}>
      {isPreview ? (
        <Paper elevation={1} sx={{ p: 2, mb: 2, border: "1px solid #e0e0e0" }}>
          {/* Question Header */}
          <Box display="flex" alignItems="flex-start" mb={1}>
            <Typography
              variant="h6"
              component="div"
              sx={{ color: "#1976d2", fontSize: "14px", fontWeight: 500 }}
            >
              {questionNumber}
            </Typography>
            <Box ml={2} flex={1}>
              <Typography variant="h6" component="div" sx={{ fontWeight: 500, mb: 0.5 }}>
                {label}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {questionDescription}
              </Typography>

              <TextField
                fullWidth
                select
                variant="outlined"
                value={selectedValue}
                onChange={handleChange}
                label={selectedValue ? "" : "Choose"}
                name={fieldName}
                sx={{
                  "& .MuiInputBase-root": {
                    height: 40,
                  },
                  "& .MuiSelect-icon": {
                    fontSize: "1.25rem",
                    right: "8px",
                  },
                }}
              >
                {options.length > 0 ? (
                  options.map((option, index) => (
                    <MenuItem key={index} value={option.value || option}>
                      {option.value || option}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="" disabled>
                    No options available
                  </MenuItem>
                )}
              </TextField>
            </Box>
          </Box>
        </Paper>
      ) : (
        <Paper
          elevation={2}
          sx={{ p: 2, backgroundColor: "#f8f9fa", border: "2px dashed #dee2e6" }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: "12px" }}>
              🔽 Dropdown Question:
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{ 
                fontWeight: 500, 
                mb: 1,
                minHeight: '24px',
                border: '1px dashed transparent',
                '&:hover': { border: '1px dashed #ccc' }
              }}
            >
              {label}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ 
                mb: 2,
                minHeight: '20px',
                border: '1px dashed transparent',
                '&:hover': { border: '1px dashed #ccc' }
              }}
            >
              {questionDescription}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "12px" }}>
              Options: {options.length > 0 ? options.map((opt) => opt.value || opt).join(", ") : "None"}
            </Typography>
            {defaultValue && (
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: "12px" }}>
                Default: {defaultValue}
              </Typography>
            )}
          </Box>
        </Paper>
      )}
    </MDBox>
  );
}

DropdownBlock.propTypes = {
  label: PropTypes.string,
  questionDescription: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.string,
      }),
    ])
  ),
  defaultValue: PropTypes.string,
  isPreview: PropTypes.bool,
  questionNumber: PropTypes.number,
  onValueChange: PropTypes.func,
  puck: PropTypes.object,
};

export default DropdownBlock;
