// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ThemeProvider, CssBaseline } from '@mui/material';
// import { AuthProvider } from './context/AuthContext';
// import { ThemeProviderContext, useThemeContext } from './context/ThemeContext';
// import { lightTheme, darkTheme } from './themes/theme.js';

// // Import all pages and layouts
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Dashboard from './pages/Dashboard';
// import Patients from './pages/Patients';
// import PatientDetails from './pages/PatientDetails';
// import Resources from './pages/Resources';
// import Reports from './pages/Reports';
// import AuthLayout from './layouts/AuthLayout';
// import DashboardLayout from './layouts/DashboardLayout.jsx';
// import ProtectedRoute from './components/ProtectedRoute.jsx';

// // This new component contains all your routing logic.
// // It sits inside the contexts, so it can access the theme.
// const AppContent = () => {
//     const { mode } = useThemeContext();
//     const theme = mode === 'light' ? lightTheme : darkTheme;

//     return (
//         <ThemeProvider theme={theme}>
//             <CssBaseline />
//             <Router>
//                 <Routes>
//                     {/* Public routes */}
//                     <Route element={<AuthLayout />}>
//                         <Route path="/login" element={<Login />} />
//                         <Route path="/signup" element={<Signup />} />
//                     </Route>

//                     {/* Protected routes */}
//                     <Route element={<ProtectedRoute />}>
//                         <Route element={<DashboardLayout />}>
//                             <Route path="/" element={<Dashboard />} />
//                             <Route path="/patients" element={<Patients />} />
//                             <Route path="/patients/:id" element={<PatientDetails />} />
//                             <Route path="/resources" element={<Resources />} />
//                             <Route path="/reports" element={<Reports />} />
//                         </Route>
//                     </Route>
//                 </Routes>
//             </Router>
//         </ThemeProvider>
//     );
// };

// // The main App function now just sets up the context providers.
// function App() {
//   return (
//     <ThemeProviderContext>
//       <AuthProvider>
//         <AppContent />
//       </AuthProvider>
//     </ThemeProviderContext>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import { ThemeProviderContext, useThemeContext } from './context/ThemeContext';
import { lightTheme, darkTheme } from './themes/theme.js';
import Chatbot from './pages/Chatbot';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import PatientDetails from './pages/PatientDetails';
import Resources from './pages/Resources';
import Reports from './pages/Reports';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const AppContent = () => {
    const { mode } = useThemeContext();
    const theme = mode === 'light' ? lightTheme : darkTheme;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route element={<AuthLayout />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                    </Route>
                    <Route element={<ProtectedRoute />}>
                        <Route element={<DashboardLayout />}>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/patients" element={<Patients />} />
                            <Route path="/patients/:id" element={<PatientDetails />} />
                            <Route path="/resources" element={<Resources />} />
                            <Route path="/reports" element={<Reports />} />
                            <Route path="/chatbot" element={<Chatbot />} />
                        </Route>
                    </Route>
                    
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

function App() {
  return (
    <ThemeProviderContext>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProviderContext>
  );
}

export default App;