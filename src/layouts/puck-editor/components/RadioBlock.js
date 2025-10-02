import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import MDBox from "components/MDBox";

function RadioBlock({
  label = "Multiple choice",
  questionDescription = "Question Description",
  options = [],
  defaultValue = "",
  isPreview = false,
  questionNumber = 2,
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

              <FormControl component="fieldset" variant="standard" fullWidth>
                <RadioGroup
                  aria-labelledby={`radio-group-label-${fieldName}`}
                  name={fieldName}
                  value={selectedValue}
                  onChange={handleChange}
                >
                  {options.length > 0 ? (
                    options.map((option, index) => {
                      const optionValue = option.value || option;
                      return (
                        <Box key={index} display="flex" alignItems="center" width="100%">
                          <FormControlLabel
                            value={optionValue}
                            control={<Radio size="small" />}
                            label={optionValue}
                            sx={{
                              flex: 1,
                              mr: 1,
                              "& .MuiFormControlLabel-label": {
                                fontSize: "0.875rem",
                              },
                            }}
                          />
                        </Box>
                      );
                    })
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No options available
                    </Typography>
                  )}
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>
        </Paper>
      ) : (
        <Paper
          elevation={2}
          sx={{ p: 2, backgroundColor: "#f8f9fa", border: "2px dashed #dee2e6" }}
        >
          <Box sx={{ mb: 2 }}>
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
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: "12px", mb: 1 }}>
                Options:
              </Typography>
              {options.map((option, index) => (
                <Box 
                  key={index} 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    mb: 1,
                    p: 1,
                    border: '1px solid #e0e0e0',
                    borderRadius: 1,
                    backgroundColor: '#fff'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        border: '2px solid #ccc',
                        mr: 1,
                        flexShrink: 0
                      }}
                    />
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        flex: 1,
                        fontSize: "14px",
                        minHeight: '20px',
                        border: '1px dashed transparent',
                        '&:hover': { border: '1px dashed #ccc' }
                      }}
                    >
                      {option.value || option}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            {defaultValue && (
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: "12px", mt: 2 }}>
                Default: {defaultValue}
              </Typography>
            )}
          </Box>
        </Paper>
      )}
    </MDBox>
  );
}

RadioBlock.propTypes = {
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

export default RadioBlock;
