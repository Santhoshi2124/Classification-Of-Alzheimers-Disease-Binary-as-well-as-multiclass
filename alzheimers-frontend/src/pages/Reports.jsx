// import { useState, useEffect, useRef } from 'react';
// import { Box, Typography, Paper, Grid, Button, CircularProgress } from '@mui/material';
// import { Pie, Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
// import apiClient from '../api/axiosConfig';
// import toast from 'react-hot-toast';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import DownloadIcon from '@mui/icons-material/Download';

// ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

// const Reports = () => {
//   const [chartData, setChartData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const reportRef = useRef();

//   useEffect(() => {
//     const fetchAnalytics = async () => {
//       try {
//         const response = await apiClient.get('/reports/analytics');
//         setChartData(response.data);
//       } catch (error) {
//         toast.error("Failed to load analytics data.");
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAnalytics();
//   }, []);

//   const handleDownloadReport = () => {
//     if (!reportRef.current) return;
//     const toastId = toast.loading('Generating Report...');
//     html2canvas(reportRef.current, { scale: 2 }).then((canvas) => {
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
//       pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//       pdf.save('analytics-report.pdf');
//       toast.success('Report Downloaded!', { id: toastId });
//     });
//   };

//   if (loading) {
//     return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
//   }

//   const diagnosisData = {
//     labels: Object.keys(chartData.diagnosis_distribution),
//     datasets: [{
//       data: Object.values(chartData.diagnosis_distribution),
//       backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 206, 86, 0.6)'],
//       borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)'],
//       borderWidth: 1,
//     }],
//   };
  
//   const monthlyPredictionsData = {
//     labels: Object.keys(chartData.monthly_predictions),
//     datasets: [{
//         label: 'Number of Predictions',
//         data: Object.values(chartData.monthly_predictions),
//         backgroundColor: 'rgba(54, 162, 235, 0.6)',
//         borderColor: 'rgba(54, 162, 235, 1)',
//         borderWidth: 1
//     }]
//   };

//   return (
//     <Box>
//        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//         <Typography variant="h4">Analytics Reports</Typography>
//         <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleDownloadReport}>
//           Download Report
//         </Button>
//       </Box>
//       <Box ref={reportRef} sx={{ p: 2, backgroundColor: 'white' }}>
//         <Grid container spacing={3}>
//             <Grid xs={12} md={6}>
//             <Paper sx={{ p: 2 }}>
//                 <Typography variant="h6" align="center" gutterBottom>Diagnosis Distribution</Typography>
//                 {Object.keys(chartData.diagnosis_distribution).length > 0 ? <Pie data={diagnosisData} /> : <Typography align="center">No data</Typography>}
//             </Paper>
//             </Grid>
//             <Grid xs={12} md={6}>
//             <Paper sx={{ p: 2 }}>
//                 <Typography variant="h6" align="center" gutterBottom>Monthly Predictions</Typography>
//                 {Object.keys(chartData.monthly_predictions).length > 0 ? <Bar data={monthlyPredictionsData} /> : <Typography align="center">No data</Typography>}
//             </Paper>
//             </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default Reports;
import { useState, useEffect, useRef } from 'react';
import { Box, Typography, Paper, Grid, Button, CircularProgress } from '@mui/material';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import apiClient from '../api/axiosConfig';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import DownloadIcon from '@mui/icons-material/Download';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Reports = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const reportRef = useRef();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await apiClient.get('/reports/analytics');
        setChartData(response.data);
      } catch (error) {
        toast.error("Failed to load analytics data.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const handleDownloadReport = () => {
    if (!reportRef.current) return;
    const toastId = toast.loading('Generating Report...');
    html2canvas(reportRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('analytics-report.pdf');
      toast.success('Report Downloaded!', { id: toastId });
    });
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }

  // --- PREPARE DATA FOR CHARTS ---
  const diagnosisData = chartData ? {
    labels: Object.keys(chartData.diagnosis_distribution),
    datasets: [{
      data: Object.values(chartData.diagnosis_distribution),
      backgroundColor: [
        'rgba(0, 150, 136, 0.7)', // Teal (Non-AD)
        'rgba(255, 193, 7, 0.7)', // Amber (Very Mild)
        'rgba(255, 152, 0, 0.7)', // Orange (Mild)
        'rgba(244, 67, 54, 0.7)', // Red (Moderate/Severe)
        'rgba(158, 158, 158, 0.7)' // Grey (N/A)
      ],
      borderColor: [
        'rgba(0, 150, 136, 1)',
        'rgba(255, 193, 7, 1)',
        'rgba(255, 152, 0, 1)',
        'rgba(244, 67, 54, 1)',
        'rgba(158, 158, 158, 1)'
      ],
      borderWidth: 1,
    }],
  } : null;
  
  const monthlyPredictionsData = chartData ? {
    labels: Object.keys(chartData.monthly_predictions),
    datasets: [{
        label: 'Number of Analyses',
        data: Object.values(chartData.monthly_predictions),
        backgroundColor: 'rgba(25, 118, 210, 0.6)', // Blue
        borderColor: 'rgba(25, 118, 210, 1)',
        borderWidth: 1
    }]
  } : null;

  return (
    <Box>
       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Analytics Reports</Typography>
        <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleDownloadReport}>
          Download Report
        </Button>
      </Box>

      {/* Report Content Area */}
      <Box ref={reportRef} sx={{ p: 2, backgroundColor: 'white' }}>
        {/* We use simple Grid item syntax which works across versions mostly, 
            or if you are on v6 use size={{ xs: 12 }} */}
        <Grid container spacing={3}>
            
            {/* Chart 1: Stages */}
            <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h6" align="center" gutterBottom>Alzheimer's Stage Distribution</Typography>
                    {diagnosisData && Object.keys(chartData.diagnosis_distribution).length > 0 ? (
                        <Box sx={{ width: '100%', maxWidth: '350px' }}>
                            <Pie data={diagnosisData} />
                        </Box>
                    ) : ( 
                        <Typography align="center" sx={{ py: 5 }}>No data available</Typography> 
                    )}
                </Paper>
            </Grid>

            {/* Chart 2: Monthly Activity */}
            <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" align="center" gutterBottom>Monthly Activity</Typography>
                    {monthlyPredictionsData && Object.keys(chartData.monthly_predictions).length > 0 ? (
                        <Bar data={monthlyPredictionsData} />
                    ) : (
                        <Typography align="center" sx={{ py: 5 }}>No data available</Typography>
                    )}
                </Paper>
            </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Reports;