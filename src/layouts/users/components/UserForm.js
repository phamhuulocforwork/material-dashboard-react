import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import MDButton from "components/MDButton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import { useUsers } from "contexts/UserContext";

const UserValidationSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "First name phải có ít nhất 2 ký tự")
    .max(50, "First name không được quá 50 ký tự")
    .required("First name là bắt buộc"),

  last_name: Yup.string()
    .min(2, "Last name phải có ít nhất 2 ký tự")
    .max(50, "Last name không được quá 50 ký tự")
    .required("Last name là bắt buộc"),

  email: Yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),

  job: Yup.string().max(100, "Job không được quá 100 ký tự"),
});

const UserForm = ({ onSuccess }) => {
  const { editingUser, handleAddUser, handleUpdateUser, closeModal } = useUsers();

  const initialValues = {
    first_name: editingUser?.first_name || "",
    last_name: editingUser?.last_name || "",
    email: editingUser?.email || "",
    job: editingUser?.job || "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (editingUser) {
        await handleUpdateUser(editingUser.id, values);
      } else {
        await handleAddUser(values);
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={UserValidationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="first_name"
                label="First Name"
                variant="outlined"
                value={values.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.first_name && Boolean(errors.first_name)}
                helperText={touched.first_name && errors.first_name}
                disabled={isSubmitting}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="last_name"
                label="Last Name"
                variant="outlined"
                value={values.last_name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.last_name && Boolean(errors.last_name)}
                helperText={touched.last_name && errors.last_name}
                disabled={isSubmitting}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="email"
                label="Email"
                type="email"
                variant="outlined"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                disabled={isSubmitting}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="job"
                label="Job"
                variant="outlined"
                value={values.job}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.job && Boolean(errors.job)}
                helperText={touched.job && errors.job}
                disabled={isSubmitting}
              />
            </Grid>
          </Grid>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              mt: 4,
            }}
          >
            <MDButton
              variant="outlined"
              color="error"
              onClick={() => {
                closeModal();
                if (onSuccess) onSuccess();
              }}
              disabled={isSubmitting}
            >
              HỦY
            </MDButton>

            {isSubmitting ? (
              <MDButton
                variant="gradient"
                color="success"
                disabled
                startIcon={<CircularProgress size={16} color="inherit" />}
              >
                {editingUser ? "Đang cập nhật..." : "Đang thêm..."}
              </MDButton>
            ) : (
              <MDButton type="submit" variant="gradient" color="success">
                {editingUser ? "CẬP NHẬT" : "THÊM"}
              </MDButton>
            )}
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
