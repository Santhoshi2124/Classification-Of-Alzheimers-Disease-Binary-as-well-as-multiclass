import { useState } from 'react';
import { Modal, Box, Typography, Button, Grid, TextField } from '@mui/material';
import toast from 'react-hot-toast';
import apiClient from '../api/axiosConfig'; // Use our new api client

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const AddPatientModal = ({ open, handleClose, onPatientAdded }) => {
  const [formData, setFormData] = useState({ name: '', age: '', gender: '' });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loadingToast = toast.loading('Adding patient...');
    try {
      await apiClient.post('/patients/', formData);
      toast.success('Patient added successfully!', { id: loadingToast });
      onPatientAdded(); // This will trigger a refresh on the main page
      handleClose();
    } catch (error) {
      toast.error('Failed to add patient.', { id: loadingToast });
      console.error(error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" gutterBottom>Add New Patient</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField name="name" label="Full Name" value={formData.name} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12}>
              <TextField name="age" label="Age" type="number" value={formData.age} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12}>
              <TextField name="gender" label="Gender" value={formData.gender} onChange={handleChange} fullWidth required />
            </Grid>
          </Grid>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">Add Patient</Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddPatientModal;