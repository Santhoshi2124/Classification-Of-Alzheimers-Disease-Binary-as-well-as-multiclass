import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { user } = useAuth();

  if (!user) {
    // If no user, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If user exists, render the child routes (the dashboard)
  return <Outlet />;
};

export default ProtectedRoute;