import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import UserForm from './UserForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
  p: 4,
  maxHeight: '90vh',
  overflow: 'auto',
};

const UserModal = ({ open, onClose, title, isEdit = false }) => {
  const handleClose = (event, reason) => {

    if (reason === 'backdropClick') {
      return;
    }
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              color: 'grey.500',
              '&:hover': {
                backgroundColor: 'grey.100',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <UserForm onSuccess={onClose} />
      </Box>
    </Modal>
  );
};

export default UserModal;
