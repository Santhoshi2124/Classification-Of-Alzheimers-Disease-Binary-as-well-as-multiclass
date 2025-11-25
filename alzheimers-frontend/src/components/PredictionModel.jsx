// import { useState } from 'react';
// import apiClient from '../api/axiosConfig';
// import { Modal, Box, Typography, Button, CircularProgress, Paper, IconButton, Tooltip } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import UploadFileIcon from '@mui/icons-material/UploadFile';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import WarningIcon from '@mui/icons-material/Warning';
// import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
// import CloseIcon from '@mui/icons-material/Close';
// import toast from 'react-hot-toast';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 500,
//   bgcolor: 'background.paper',
//   boxShadow: 24,
//   p: 4,
//   borderRadius: 2,
//   textAlign: 'center',
// };

// const DropZone = styled('div', {
//   shouldForwardProp: (prop) => prop !== 'isDragging'
// })(({ theme, isDragging }) => ({
//   border: `2px dashed ${theme.palette.divider}`,
//   borderRadius: theme.shape.borderRadius,
//   padding: theme.spacing(4),
//   textAlign: 'center',
//   cursor: 'pointer',
//   backgroundColor: isDragging ? theme.palette.action.selected : theme.palette.action.hover,
//   transition: 'background-color 0.3s ease',
// }));

// const PredictionModal = ({ open, handleClose, patientId, onPredictionSaved }) => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [isDragging, setIsDragging] = useState(false);

//   const handleFileSelect = (file) => {
//     if (file && file.type === 'text/csv') {
//       setSelectedFile(file);
//     } else {
//       toast.error('Please select a valid .csv file.');
//     }
//   };

//   const handleDragOver = (event) => event.preventDefault();
//   const handleDragEnter = (event) => { event.preventDefault(); setIsDragging(true); };
//   const handleDragLeave = (event) => { event.preventDefault(); setIsDragging(false); };
//   const handleDrop = (event) => {
//     event.preventDefault();
//     setIsDragging(false);
//     if (event.dataTransfer.files && event.dataTransfer.files[0]) {
//       handleFileSelect(event.dataTransfer.files[0]);
//     }
//   };
//   const handleFileChange = (event) => {
//     if (event.target.files && event.target.files[0]) {
//       handleFileSelect(event.target.files[0]);
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!selectedFile) return;
//     setLoading(true);
//     setResult(null);
//     const formData = new FormData();
//     formData.append('file', selectedFile);
//     try {
//       const predictResponse = await apiClient.post('/predict', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       const predictionResult = predictResponse.data;
//       setResult(predictionResult);
//       const saveData = {
//         prediction_result: predictionResult.prediction,
//         confidence_score: predictionResult.confidence,
//       };
//       await apiClient.post(`/patients/${patientId}/predictions`, saveData);
//     } catch (error) {
//       setResult({
//         prediction: 'Error',
//         confidence: 0,
//         error: error.response?.data?.detail || "An error occurred."
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleModalClose = () => {
//     if (result && !result.error) { onPredictionSaved(); }
//     setSelectedFile(null);
//     setResult(null);
//     handleClose();
//   };
//   const handleReset = () => {
//      if (result && !result.error) { onPredictionSaved(); }
//      setSelectedFile(null);
//      setResult(null);
//   };

//   return (
//     <Modal open={open} onClose={handleModalClose}>
//       <Box sx={style}>
//         <Typography variant="h5" component="h2" gutterBottom>Upload CSV for Prediction</Typography>
//         {!result && (
//           <form onSubmit={handleSubmit}>
//             <input accept=".csv" style={{ display: 'none' }} id="file-upload" type="file" onChange={handleFileChange} />
//             <label htmlFor="file-upload">
//               <DropZone isDragging={isDragging} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop}>
//                 <UploadFileIcon sx={{ fontSize: 50, color: 'primary.main' }} />
//                 <Typography>Drag & drop CSV file or click to select</Typography>
//               </DropZone>
//             </label>
//             {selectedFile && (
//                 <Paper variant="outlined" sx={{ mt: 2, p: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left' }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5}}><InsertDriveFileIcon color="primary" /><Box><Typography variant="body1" sx={{ fontWeight: 500 }}>{selectedFile.name}</Typography><Typography variant="body2" color="text.secondary">{(selectedFile.size / 1024).toFixed(2)} KB</Typography></Box></Box>
//                     <IconButton size="small" onClick={() => setSelectedFile(null)}><CloseIcon fontSize="small" /></IconButton>
//                 </Paper>
//             )}
//             <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
//               <Button onClick={handleModalClose}>Cancel</Button>
//               <Tooltip title={!selectedFile ? "Please select a CSV file first" : ""}><span><Button type="submit" variant="contained" disabled={!selectedFile || loading}>{loading ? <CircularProgress size={24} /> : 'Get Prediction'}</Button></span></Tooltip>
//             </Box>
//           </form>
//         )}
//         {/* {result && (
//           <Box sx={{ mt: 2 }}>
//             <Paper elevation={3} sx={{ p: 3, backgroundColor: result.prediction === 'Error' ? '#ffebee' : 'transparent' }}>
//               {result.prediction === 'Error' ? <WarningIcon color="error" sx={{ fontSize: 60 }} /> : (result.prediction === 'Non-demented' ? <CheckCircleIcon color="success" sx={{ fontSize: 60 }} /> : <ErrorIcon color="error" sx={{ fontSize: 60 }} />)}
//               <Typography variant="h4" gutterBottom>Result</Typography>
//               {result.error ? ( <Typography variant="h6" sx={{ color: 'red' }}>{result.error}</Typography> ) : (
//                 <>
//                   <Typography variant="h5" sx={{ fontWeight: 'bold', color: result.prediction === 'Demented' ? 'error.main' : 'primary.main' }}>{result.prediction}</Typography>
//                   <Typography variant="body1" sx={{ mt: 1 }}>Confidence: <strong>{(result.confidence * 100).toFixed(2)}%</strong></Typography>
//                 </>
//               )}
//               {result.prediction === 'Error' ? <WarningIcon color="error" sx={{ fontSize: 60 }} /> : (result.prediction === 'Non-demented' ? <CheckCircleIcon color="success" sx={{ fontSize: 60 }} /> : <WarningIcon color="warning" sx={{ fontSize: 60 }} />)}
//             </Paper>
//             <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 1 }}>
//               <Button onClick={handleModalClose}>Close</Button>
//               <Button variant="contained" onClick={handleReset}>New Prediction</Button>
//             </Box>
//           </Box>
//         )} */}
//         {result && (
//   <Box sx={{ mt: 2 }}>
//     <Paper elevation={3} sx={{ p: 3, backgroundColor: result.prediction === 'Error' ? '#ffebee' : 'transparent' }}>
      
//       {/* This is the icon logic you wanted */}
//        {result.prediction === 'Error' ? <WarningIcon color="error" sx={{ fontSize: 60 }} /> : (result.prediction === 'It is Non-AD(Normal)' ? <CheckCircleIcon color="success" sx={{ fontSize: 60 }} /> : <WarningIcon color="warning" sx={{ fontSize: 60 }} />)}
      
//       {/* This is the missing text content */}
//       <Typography variant="h4" gutterBottom>Result</Typography>
//       {result.error ? ( 
//         <Typography variant="h6" sx={{ color: 'red' }}>{result.error}</Typography> 
//       ) : (
//         <>
//           <Typography variant="h5" sx={{ fontWeight: 'bold', color: result.prediction === "You have Alzheimer's Disease(AD)" ? 'error.main' : 'primary.main' }}>
//                             {result.prediction}
//                         </Typography>
//                         <Typography variant="body1" sx={{ mt: 1 }}>
//                             Confidence: <strong>{(result.confidence * 100).toFixed(2)}%</strong>
//                         </Typography>
//                         </>
//       )}
//     </Paper>
//     <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 1 }}>
//       <Button onClick={handleModalClose}>Close</Button>
//       <Button variant="contained" onClick={handleReset}>New Prediction</Button>
//     </Box>
//   </Box>
// )}

//       </Box>
//     </Modal>
//   );
// };

// export default PredictionModal;
// import { useState } from 'react';
// import apiClient from '../api/axiosConfig';
// import { Modal, Box, Typography, Button, CircularProgress, Paper, IconButton, Tooltip, ToggleButton, ToggleButtonGroup } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import UploadFileIcon from '@mui/icons-material/UploadFile';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import WarningIcon from '@mui/icons-material/Warning';
// import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
// import CloseIcon from '@mui/icons-material/Close';
// import toast from 'react-hot-toast';

// const style = {
//   position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
//   width: 500, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2, textAlign: 'center',
// };

// const DropZone = styled('div', { shouldForwardProp: (prop) => prop !== 'isDragging' })(({ theme, isDragging }) => ({
//   border: `2px dashed ${theme.palette.divider}`, borderRadius: theme.shape.borderRadius, padding: theme.spacing(4),
//   textAlign: 'center', cursor: 'pointer',
//   backgroundColor: isDragging ? theme.palette.action.selected : theme.palette.action.hover,
//   transition: 'background-color 0.3s ease',
// }));

// const PredictionModal = ({ open, handleClose, patientId, onPredictionSaved }) => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [analysisType, setAnalysisType] = useState('binary');

//   const handleAnalysisTypeChange = (event, newType) => {
//     if (newType !== null) {
//         setAnalysisType(newType);
//         setResult(null);
//         setSelectedFile(null);
//     }
//   };

//   const handleFileSelect = (file) => { if (file && file.type === 'text/csv') setSelectedFile(file); else toast.error('Please select a valid .csv file.'); };
//   const handleDragOver = (e) => e.preventDefault();
//   const handleDragEnter = (e) => { e.preventDefault(); setIsDragging(true); };
//   const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
//   const handleDrop = (e) => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files.length > 0) handleFileSelect(e.dataTransfer.files[0]); };
//   const handleFileChange = (e) => { if (e.target.files[0]) handleFileSelect(e.target.files[0]); };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!selectedFile) return;
//     setLoading(true); setResult(null);
    
//     const formData = new FormData();
//     formData.append('file', selectedFile);
//     const endpoint = analysisType === 'binary' ? '/predict' : '/predict/multiclass';

//     try {
//       const predictResponse = await apiClient.post(endpoint, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
//       const predictionResult = predictResponse.data;
//       setResult(predictionResult);

//       const saveData = {
//         prediction_result: predictionResult.prediction,
//         confidence_score: predictionResult.confidence,
//         stage: predictionResult.stage || "N/A" 
//       };
//       await apiClient.post(`/patients/${patientId}/predictions`, saveData);
//     } catch (error) {
//       console.error("Error:", error);
//       let msg = "An error occurred.";
//       if (error.response?.data?.detail) msg = error.response.data.detail;
//       setResult({ prediction: 'Error', confidence: 0, error: msg });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleModalClose = () => { if (result && !result.error) onPredictionSaved(); setSelectedFile(null); setResult(null); handleClose(); };
//   const handleReset = () => { if (result && !result.error) onPredictionSaved(); setSelectedFile(null); setResult(null); };

//   return (
//     <Modal open={open} onClose={handleModalClose}>
//       <Box sx={style}>
//         <Typography variant="h5" component="h2" gutterBottom>Start New Analysis</Typography>
        
//         {!result && (
//             <Box sx={{ mb: 3 }}>
//                 <ToggleButtonGroup value={analysisType} exclusive onChange={handleAnalysisTypeChange} color="primary" fullWidth>
//                     <ToggleButton value="binary">Binary (AD/Normal)</ToggleButton>
//                     <ToggleButton value="multiclass">Stage Identification</ToggleButton>
//                 </ToggleButtonGroup>
//                 <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
//                     {analysisType === 'binary' ? "Requires: Basic Clinical Data CSV" : "Requires: Advanced Stage Data CSV"}
//                 </Typography>
//             </Box>
//         )}

//         {!result && (
//           <form onSubmit={handleSubmit}>
//             <input accept=".csv" style={{ display: 'none' }} id="file-upload" type="file" onChange={handleFileChange} />
//             <label htmlFor="file-upload">
//               <DropZone isDragging={isDragging} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop}>
//                 <UploadFileIcon sx={{ fontSize: 50, color: 'primary.main' }} />
//                 <Typography>Drag & drop CSV file or click to select</Typography>
//               </DropZone>
//             </label>
//             {selectedFile && (
//                 <Paper variant="outlined" sx={{ mt: 2, p: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left' }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5}}><InsertDriveFileIcon color="primary" /><Box><Typography variant="body1" sx={{ fontWeight: 500 }}>{selectedFile.name}</Typography><Typography variant="body2" color="text.secondary">{(selectedFile.size / 1024).toFixed(2)} KB</Typography></Box></Box>
//                     <IconButton size="small" onClick={() => setSelectedFile(null)}><CloseIcon fontSize="small" /></IconButton>
//                 </Paper>
//             )}
//             <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
//               <Button onClick={handleModalClose}>Cancel</Button>
//               <Tooltip title={!selectedFile ? "Please select a CSV file first" : ""}><span><Button type="submit" variant="contained" disabled={!selectedFile || loading}>{loading ? <CircularProgress size={24} /> : 'Get Prediction'}</Button></span></Tooltip>
//             </Box>
//           </form>
//         )}

//         {result && (
//           <Box sx={{ mt: 2 }}>
//             <Paper elevation={3} sx={{ p: 3, backgroundColor: result.prediction === 'Error' ? '#ffebee' : 'transparent' }}>
//               {/* CORRECTED ICON LOGIC: Checks for "Non-AD" or "Non-demented" */}
//               {result.prediction === 'Error' ? <WarningIcon color="error" sx={{ fontSize: 60 }} /> : 
//                (result.prediction.includes("Non") ? <CheckCircleIcon color="success" sx={{ fontSize: 60 }} /> : <WarningIcon color="warning" sx={{ fontSize: 60 }} />)}
              
//               <Typography variant="h4" gutterBottom>Result</Typography>
              
//               {result.error ? ( <Typography variant="h6" sx={{ color: 'red' }}>{result.error}</Typography> ) : (
//                 <>
//                   {/* CORRECTED COLOR LOGIC: Checks for "Alzheimer" or "Demented" */}
//                   <Typography variant="h5" sx={{ fontWeight: 'bold', color: (result.prediction.includes("Alzheimer") || result.prediction === "Demented") ? 'error.main' : 'primary.main' }}>
//                     {result.prediction}
//                   </Typography>
                  
//                   {result.stage && result.stage !== "N/A" && ( <Typography variant="h6" sx={{ color: 'secondary.main', mt: 1 }}>Stage: {result.stage}</Typography> )}
//                   {result.confidence > 0 && ( <Typography variant="body1" sx={{ mt: 1 }}>Confidence: <strong>{(result.confidence * 100).toFixed(2)}%</strong></Typography> )}
//                 </>
//               )}
//             </Paper>
//             <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 1 }}>
//               <Button onClick={handleModalClose}>Close</Button>
//               <Button variant="contained" onClick={handleReset}>New Analysis</Button>
//             </Box>
//           </Box>
//         )}
//       </Box>
//     </Modal>
//   );
// };

// export default PredictionModal;
// import { useState } from 'react';
// import apiClient from '../api/axiosConfig';
// import { Modal, Box, Typography, Button, CircularProgress, Paper, IconButton, Tooltip, ToggleButton, ToggleButtonGroup } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import { Bar } from 'react-chartjs-2'; // Import Bar Chart
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip as ChartTooltip, Legend } from 'chart.js'; // Import Chart.js components
// import UploadFileIcon from '@mui/icons-material/UploadFile';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import WarningIcon from '@mui/icons-material/Warning';
// import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
// import CloseIcon from '@mui/icons-material/Close';
// import toast from 'react-hot-toast';

// // Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip, Legend);

// const style = {
//   position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
//   width: 600, // Increased width slightly for the chart
//   bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2, textAlign: 'center',
//   maxHeight: '90vh', overflowY: 'auto' // Allow scrolling if content is tall
// };

// const DropZone = styled('div', { shouldForwardProp: (prop) => prop !== 'isDragging' })(({ theme, isDragging }) => ({
//   border: `2px dashed ${theme.palette.divider}`, borderRadius: theme.shape.borderRadius, padding: theme.spacing(4),
//   textAlign: 'center', cursor: 'pointer',
//   backgroundColor: isDragging ? theme.palette.action.selected : theme.palette.action.hover,
//   transition: 'background-color 0.3s ease',
// }));

// const PredictionModal = ({ open, handleClose, patientId, onPredictionSaved }) => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [analysisType, setAnalysisType] = useState('binary');

//   const handleAnalysisTypeChange = (event, newType) => {
//     if (newType !== null) {
//         setAnalysisType(newType);
//         setResult(null);
//         setSelectedFile(null);
//     }
//   };

//   const handleFileSelect = (file) => { if (file && file.type === 'text/csv') setSelectedFile(file); else toast.error('Please select a valid .csv file.'); };
//   const handleDragOver = (e) => e.preventDefault();
//   const handleDragEnter = (e) => { e.preventDefault(); setIsDragging(true); };
//   const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
//   const handleDrop = (e) => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files.length > 0) handleFileSelect(e.dataTransfer.files[0]); };
//   const handleFileChange = (e) => { if (e.target.files[0]) handleFileSelect(e.target.files[0]); };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!selectedFile) return;
//     setLoading(true); setResult(null);
    
//     const formData = new FormData();
//     formData.append('file', selectedFile);
//     const endpoint = analysisType === 'binary' ? '/predict' : '/predict/multiclass';

//     try {
//       const predictResponse = await apiClient.post(endpoint, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
//       const predictionResult = predictResponse.data;
//       setResult(predictionResult);

//       // after receiving predictionResult
//     const predictionLabel = predictionResult.prediction
//       || predictionResult.prediction_result
//       || predictionResult.prediction_label   // fallback if another name used

//     const confidenceVal = typeof predictionResult.confidence !== 'undefined'
//       ? predictionResult.confidence
//       : (typeof predictionResult.confidence_score !== 'undefined' ? predictionResult.confidence_score : 0)

//     const saveData = {
//       prediction_result: predictionLabel,
//       confidence_score: Number(confidenceVal) || 0,
//       stage: predictionResult.stage || "N/A"
//     };
//     await apiClient.post(`/patients/${patientId}/predictions`, saveData);

      
//     } catch (error) {
//       console.error("Error:", error);
//       let msg = "An error occurred.";
//       if (error.response?.data?.detail) msg = error.response.data.detail;
//       setResult({ prediction: 'Error', confidence: 0, error: msg });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleModalClose = () => { if (result && !result.error) onPredictionSaved(); setSelectedFile(null); setResult(null); handleClose(); };
//   const handleReset = () => { if (result && !result.error) onPredictionSaved(); setSelectedFile(null); setResult(null); };

//   // --- CHART DATA PREPARATION ---
//   const featureChartData = result?.top_features ? {
//       labels: result.top_features.map(f => f.feature).reverse(),
//       datasets: [{
//           label: 'Impact',
//           data: result.top_features.map(f => f.importance).reverse(),
//           backgroundColor: 'rgba(0, 121, 107, 0.6)',
//           borderColor: 'rgba(0, 121, 107, 1)',
//           borderWidth: 1,
//       }]
//   } : null;
  
//   const featureChartOptions = {
//       indexAxis: 'y',
//       responsive: true,
//       plugins: { legend: { display: false }, title: { display: true, text: 'Top Risk Factors' } },
//       maintainAspectRatio: false
//   };
//   // -----------------------------

//   return (
//     <Modal open={open} onClose={handleModalClose}>
//       <Box sx={style}>
//         <Typography variant="h5" component="h2" gutterBottom>Start New Analysis</Typography>
        
//         {!result && (
//             <Box sx={{ mb: 3 }}>
//                 <ToggleButtonGroup value={analysisType} exclusive onChange={handleAnalysisTypeChange} color="primary" fullWidth>
//                     <ToggleButton value="binary">Binary (AD/Normal)</ToggleButton>
//                     <ToggleButton value="multiclass">Stage Identification</ToggleButton>
//                 </ToggleButtonGroup>
//                 <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
//                     {analysisType === 'binary' ? "Requires: Basic Clinical Data CSV" : "Requires: Advanced Stage Data CSV"}
//                 </Typography>
//             </Box>
//         )}

//         {!result && (
//           <form onSubmit={handleSubmit}>
//             <input accept=".csv" style={{ display: 'none' }} id="file-upload" type="file" onChange={handleFileChange} />
//             <label htmlFor="file-upload">
//               <DropZone isDragging={isDragging} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop}>
//                 <UploadFileIcon sx={{ fontSize: 50, color: 'primary.main' }} />
//                 <Typography>Drag & drop CSV file or click to select</Typography>
//               </DropZone>
//             </label>
//             {selectedFile && (
//                 <Paper variant="outlined" sx={{ mt: 2, p: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left' }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5}}><InsertDriveFileIcon color="primary" /><Box><Typography variant="body1" sx={{ fontWeight: 500 }}>{selectedFile.name}</Typography><Typography variant="body2" color="text.secondary">{(selectedFile.size / 1024).toFixed(2)} KB</Typography></Box></Box>
//                     <IconButton size="small" onClick={() => setSelectedFile(null)}><CloseIcon fontSize="small" /></IconButton>
//                 </Paper>
//             )}
//             <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
//               <Button onClick={handleModalClose}>Cancel</Button>
//               <Tooltip title={!selectedFile ? "Please select a CSV file first" : ""}><span><Button type="submit" variant="contained" disabled={!selectedFile || loading}>{loading ? <CircularProgress size={24} /> : 'Get Prediction'}</Button></span></Tooltip>
//             </Box>
//           </form>
//         )}

//         {result && (
//           <Box sx={{ mt: 2 }}>
//             <Paper elevation={3} sx={{ p: 3, backgroundColor: result.prediction === 'Error' ? '#ffebee' : 'transparent' }}>
//               {result.prediction === 'Error' ? <WarningIcon color="error" sx={{ fontSize: 60 }} /> : 
//                (result.prediction.includes("Non") ? <CheckCircleIcon color="success" sx={{ fontSize: 60 }} /> : <WarningIcon color="warning" sx={{ fontSize: 60 }} />)}
              
//               <Typography variant="h4" gutterBottom>Result</Typography>
              
//               {result.error ? ( <Typography variant="h6" sx={{ color: 'red' }}>{result.error}</Typography> ) : (
//                 <>
//                   <Typography variant="h5" sx={{ fontWeight: 'bold', color: (result.prediction.includes("Alzheimer") || result.prediction === "Demented") ? 'error.main' : 'primary.main' }}>
//                     {result.prediction}
//                   </Typography>
                  
//                   {result.stage && result.stage !== "N/A" && ( <Typography variant="h6" sx={{ color: 'secondary.main', mt: 1 }}>Stage: {result.stage}</Typography> )}
                  
//                   {result.confidence > 0 && ( <Typography variant="body1" sx={{ mt: 1 }}>Confidence: <strong>{(result.confidence * 100).toFixed(2)}%</strong></Typography> )}

//                   {/* --- ADDED BAR CHART HERE --- */}
//                   {featureChartData && (
//                       <Box sx={{ height: '180px', mt: 2 }}>
//                           <Bar data={featureChartData} options={featureChartOptions} />
//                       </Box>
//                   )}
//                   {/* ----------------------------- */}
//                 </>
//               )}
//             </Paper>
//             <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 1 }}>
//               <Button onClick={handleModalClose}>Close</Button>
//               <Button variant="contained" onClick={handleReset}>New Analysis</Button>
//             </Box>
//           </Box>
//         )}
//       </Box>
//     </Modal>
//   );
// };

// export default PredictionModal;
import { useState } from 'react';
import apiClient from '../api/axiosConfig';
import { Modal, Box, Typography, Button, CircularProgress, Paper, IconButton, Tooltip, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { styled } from '@mui/material/styles';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CloseIcon from '@mui/icons-material/Close';
import toast from 'react-hot-toast';

const style = {
  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
  width: 500, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2, textAlign: 'center',
};

const DropZone = styled('div', { shouldForwardProp: (prop) => prop !== 'isDragging' })(({ theme, isDragging }) => ({
  border: `2px dashed ${theme.palette.divider}`, borderRadius: theme.shape.borderRadius, padding: theme.spacing(4),
  textAlign: 'center', cursor: 'pointer',
  backgroundColor: isDragging ? theme.palette.action.selected : theme.palette.action.hover,
  transition: 'background-color 0.3s ease',
}));

const PredictionModal = ({ open, handleClose, patientId, onPredictionSaved }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [analysisType, setAnalysisType] = useState('binary');

  const handleAnalysisTypeChange = (event, newType) => {
    if (newType !== null) {
        setAnalysisType(newType);
        setResult(null);
        setSelectedFile(null);
    }
  };

  const handleFileSelect = (file) => { if (file && file.type === 'text/csv') setSelectedFile(file); else toast.error('Please select a valid .csv file.'); };
  const handleDragOver = (e) => e.preventDefault();
  const handleDragEnter = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e) => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files.length > 0) handleFileSelect(e.dataTransfer.files[0]); };
  const handleFileChange = (e) => { if (e.target.files[0]) handleFileSelect(e.target.files[0]); };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) return;
    setLoading(true); setResult(null);
    
    const formData = new FormData();
    formData.append('file', selectedFile);
    const endpoint = analysisType === 'binary' ? '/predict' : '/predict/multiclass';

    try {
      // 1. Get Prediction
      const predictResponse = await apiClient.post(endpoint, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      const predictionResult = predictResponse.data;

      // 2. Error Check (if backend returns an error object)
      if (predictResponse.status !== 200 || predictionResult.error) {
          throw new Error(predictionResult.error || "Prediction engine returned an invalid response.");
      }
      
      setResult(predictionResult);

      // 3. Save to Database (CRITICAL FIX: Ensure stage is always sent)
      const saveData = {
        prediction_result: predictionResult.prediction,
        confidence_score: predictionResult.confidence,
        stage: predictionResult.stage || "N/A" 
      };
      
      await apiClient.post(`/patients/${patientId}/predictions`, saveData);

    } catch (error) {
      console.error("Error during prediction process:", error);
      let errorMessage = "An error occurred.";
      
      // Handle HTTP errors (like 422 or 500)
      if (error.response && error.response.data) {
          const detail = error.response.data.detail;
          if (typeof detail === 'string') errorMessage = detail;
          else if (Array.isArray(detail)) errorMessage = `Validation Error: ${detail[0].msg}`;
          else errorMessage = "Server error (check console)";
      } else if (error.message) {
          errorMessage = error.message;
      }
      
      setResult({ prediction: 'Error', confidence: 0, error: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => { if (result && !result.error) onPredictionSaved(); setSelectedFile(null); setResult(null); handleClose(); };
  const handleReset = () => { if (result && !result.error) onPredictionSaved(); setSelectedFile(null); setResult(null); };

  return (
    <Modal open={open} onClose={handleModalClose}>
      <Box sx={style}>
        <Typography variant="h5" component="h2" gutterBottom>Start New Analysis</Typography>
        
        {!result && (
            <Box sx={{ mb: 3 }}>
                <ToggleButtonGroup value={analysisType} exclusive onChange={handleAnalysisTypeChange} color="primary" fullWidth>
                    <ToggleButton value="binary">Binary (AD/Normal)</ToggleButton>
                    <ToggleButton value="multiclass">Stage Identification</ToggleButton>
                </ToggleButtonGroup>
                <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
                    {analysisType === 'binary' ? "Requires: Basic Clinical Data CSV" : "Requires: Advanced Stage Data CSV"}
                </Typography>
            </Box>
        )}

        {!result && (
          <form onSubmit={handleSubmit}>
            <input accept=".csv" style={{ display: 'none' }} id="file-upload" type="file" onChange={handleFileChange} />
            <label htmlFor="file-upload">
              <DropZone isDragging={isDragging} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop}>
                <UploadFileIcon sx={{ fontSize: 50, color: 'primary.main' }} />
                <Typography>Drag & drop CSV file or click to select</Typography>
              </DropZone>
            </label>
            {selectedFile && (
                <Paper variant="outlined" sx={{ mt: 2, p: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5}}><InsertDriveFileIcon color="primary" /><Box><Typography variant="body1" sx={{ fontWeight: 500 }}>{selectedFile.name}</Typography><Typography variant="body2" color="text.secondary">{(selectedFile.size / 1024).toFixed(2)} KB</Typography></Box></Box>
                    <IconButton size="small" onClick={() => setSelectedFile(null)}><CloseIcon fontSize="small" /></IconButton>
                </Paper>
            )}
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button onClick={handleModalClose}>Cancel</Button>
              <Tooltip title={!selectedFile ? "Please select a CSV file first" : ""}><span><Button type="submit" variant="contained" disabled={!selectedFile || loading}>{loading ? <CircularProgress size={24} /> : 'Get Prediction'}</Button></span></Tooltip>
            </Box>
          </form>
        )}

        {result && (
          <Box sx={{ mt: 2 }}>
            <Paper elevation={3} sx={{ p: 3, backgroundColor: result.prediction === 'Error' ? '#ffebee' : 'transparent' }}>
              {result.prediction === 'Error' ? <WarningIcon color="error" sx={{ fontSize: 60 }} /> : 
               (result.prediction.includes("Non") ? <CheckCircleIcon color="success" sx={{ fontSize: 60 }} /> : <WarningIcon color="warning" sx={{ fontSize: 60 }} />)}
              
              <Typography variant="h4" gutterBottom>Result</Typography>
              
              {result.error ? ( <Typography variant="h6" sx={{ color: 'red' }}>{result.error}</Typography> ) : (
                <>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: (result.prediction.includes("Alzheimer") || result.prediction === "Demented") ? 'error.main' : 'primary.main' }}>
                    {result.prediction}
                  </Typography>
                  
                  {result.stage && result.stage !== "N/A" && ( <Typography variant="h6" sx={{ color: 'secondary.main', mt: 1 }}>Stage: {result.stage}</Typography> )}
                  {result.confidence > 0 && ( <Typography variant="body1" sx={{ mt: 1 }}>Confidence: <strong>{(result.confidence * 100).toFixed(2)}%</strong></Typography> )}
                </>
              )}
            </Paper>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 1 }}>
              <Button onClick={handleModalClose}>Close</Button>
              <Button variant="contained" onClick={handleReset}>New Analysis</Button>
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default PredictionModal;