import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import MDButton from "components/MDButton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import { useUsers } from 'contexts/UserContext';

const UserValidationSchema = Yup.object().shape({
  hoTen: Yup.string()
    .min(3, 'Họ tên phải có ít nhất 3 ký tự')
    .max(50, 'Họ tên không được quá 50 ký tự')
    .required('Họ tên là bắt buộc'),
  
  email: Yup.string()
    .email('Email không hợp lệ')
    .required('Email là bắt buộc'),
  
  vaiTro: Yup.string()
    .test('is-valid-role', 'Vai trò không hợp lệ', function(value) {
      if (!value) return false;
      return ['Admin', 'User'].includes(value);
    })
    .required('Vai trò là bắt buộc'),
  
  ngaySinh: Yup.date()
    .required('Ngày sinh là bắt buộc')
    .test('age', 'Tuổi phải từ 18 trở lên', function(value) {
      if (!value) return false;
      const today = new Date();
      const birthDate = new Date(value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      return age >= 18;
    })
    .max(new Date(), 'Ngày sinh không thể là ngày trong tương lai')
});

const UserForm = ({ onSuccess }) => {
  const { editingUser, handleAddUser, handleUpdateUser, closeModal } = useUsers();

  const initialValues = {
    hoTen: editingUser?.hoTen || '',
    email: editingUser?.email || '',
    vaiTro: editingUser?.vaiTro || '',
    ngaySinh: editingUser?.ngaySinh || ''
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
      console.error('Error submitting form:', error);
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="hoTen"
                label="Họ Tên"
                variant="outlined"
                value={values.hoTen}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.hoTen && Boolean(errors.hoTen)}
                helperText={touched.hoTen && errors.hoTen}
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
                select
                name="vaiTro"
                label="Vai Trò"
                value={values.vaiTro}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.vaiTro && Boolean(errors.vaiTro)}
                helperText={touched.vaiTro && errors.vaiTro}
                disabled={isSubmitting}
                variant="outlined"
                sx={{
                  "& .MuiInputBase-root": {
                    height: 42,
                  },
                }}
              >
                {['Admin', 'User'].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="ngaySinh"
                label="Ngày Sinh"
                type="date"
                variant="outlined"
                value={values.ngaySinh}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.ngaySinh && Boolean(errors.ngaySinh)}
                helperText={touched.ngaySinh && errors.ngaySinh}
                disabled={isSubmitting}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
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
              <MDButton
                type="submit"
                variant="gradient"
                color="success"
              >
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