import { useState, useEffect } from 'react';
import { Box, Typography, Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import toast from 'react-hot-toast';

import apiClient from '../api/axiosConfig';
import AddPatientModal from '../components/AddPatientModel';

const Patients = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/patients/');
      const patientsWithId = response.data.map(p => ({ ...p, id: p._id }));
      setPatients(patientsWithId);
    } catch (error) {
      toast.error('Failed to fetch patients.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);
  
  const openDeleteConfirm = (patient) => {
    setPatientToDelete(patient);
    setIsConfirmOpen(true);
  };

  const closeDeleteConfirm = () => {
    setPatientToDelete(null);
    setIsConfirmOpen(false);
  };

  const handleDelete = async () => {
    if (!patientToDelete) return;
    const toastId = toast.loading('Deleting patient...');
    try {
      await apiClient.delete(`/patients/${patientToDelete.id}`);
      toast.success('Patient deleted successfully.', { id: toastId });
      fetchPatients(); // Refresh the list
    } catch (error) {
      toast.error('Failed to delete patient.', { id: toastId });
      console.error(error);
    } finally {
      closeDeleteConfirm();
    }
  };

  const columns = [
    { field: 'id', headerName: 'Patient ID', width: 220 },
    { field: 'name', headerName: 'Name', width: 250 },
    { field: 'age', headerName: 'Age', width: 100 },
    { field: 'gender', headerName: 'Gender', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box>
            <Button
                variant="contained"
                size="small"
                onClick={() => navigate(`/patients/${params.id}`)}
                sx={{ mr: 1 }}
            >
                View
            </Button>
            <IconButton
                color="error"
                size="small"
                onClick={() => openDeleteConfirm(params.row)}
            >
                <DeleteIcon />
            </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Patient Management</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setIsAddModalOpen(true)}>
          Add New Patient
        </Button>
      </Box>
      <Box sx={{ height: 400, width: '100%', backgroundColor: 'white' }}>
        <DataGrid
          rows={patients}
          columns={columns}
          loading={loading}
          
        />
      </Box>
      <AddPatientModal
        open={isAddModalOpen}
        handleClose={() => setIsAddModalOpen(false)}
        onPatientAdded={fetchPatients}
      />
      <Dialog
        open={isConfirmOpen}
        onClose={closeDeleteConfirm}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          {/* This is the complete text */}
          <DialogContentText>
            Are you sure you want to delete patient "{patientToDelete?.name}"? 
            All associated prediction records will also be permanently deleted. This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirm}>Cancel</Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Patients;