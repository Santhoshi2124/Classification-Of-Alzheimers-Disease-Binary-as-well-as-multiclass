import { useState, useEffect } from 'react';
import { Typography, Grid, Paper, Box, CircularProgress } from '@mui/material';
import apiClient from '../api/axiosConfig';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiClient.get('/reports/dashboard-stats');
        setStats(response.data);
      } catch (error) {
        toast.error("Could not load dashboard statistics.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const StatCard = ({ title, value }) => (
    <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: 180, justifyContent: 'center', textAlign: 'center' }}>
      <Typography variant="h6" color="text.secondary" gutterBottom>{title}</Typography>
      <Typography component="p" variant="h3">
        {loading ? <CircularProgress size={40} /> : value}
      </Typography>
    </Paper>
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <StatCard title="Total Patients" value={stats?.total_patients} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard title="Analyses Performed" value={stats?.total_predictions} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard title="Positive Detections" value={stats?.positive_detections} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;