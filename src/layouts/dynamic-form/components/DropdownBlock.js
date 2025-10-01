/*
=========================================================
* Material Dashboard 2 React - DropdownBlock Component  
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// @mui material components
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function DropdownBlock({
  label = "Dropdown Field",
  options = [],
  defaultValue = "",
  isPreview = false,
  onValueChange,
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

  // Generate unique field name for form data
  const fieldName = label.toLowerCase().replace(/\s+/g, "_");

  return (
    <MDBox mb={2}>
      {isPreview ? (
        <FormControl fullWidth variant="outlined" size="small">
          <InputLabel id={`dropdown-label-${fieldName}`}>{label}</InputLabel>
          <Select
            labelId={`dropdown-label-${fieldName}`}
            id={`dropdown-select-${fieldName}`}
            value={selectedValue}
            label={label}
            onChange={handleChange}
            name={fieldName}
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
          </Select>
        </FormControl>
      ) : (
        // Editor mode - static display
        <Box
          sx={{
            border: "2px dashed #e0e0e0",
            borderRadius: 1,
            p: 2,
            backgroundColor: "#f9f9f9",
            minHeight: 60,
            display: "flex",
            alignItems: "center",
          }}
        >
          <MDTypography variant="body2" color="text.secondary">
            <strong>Dropdown:</strong> {label}
            <br />
            <small>
              Options:{" "}
              {options.length > 0 ? options.map((opt) => opt.value || opt).join(", ") : "None"}
            </small>
            {defaultValue && (
              <>
                <br />
                <small>Default: {defaultValue}</small>
              </>
            )}
          </MDTypography>
        </Box>
      )}
    </MDBox>
  );
}

DropdownBlock.propTypes = {
  label: PropTypes.string,
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
  onValueChange: PropTypes.func,
};

export default DropdownBlock;
