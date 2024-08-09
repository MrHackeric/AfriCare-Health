import React, { useContext, useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Adjust the import based on your setup

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (user !== null) {
      // Set loading to false once user state is determined
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    // Optionally, show a loading spinner or placeholder while determining user state
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/" state={{ from: location }} />;
};

export default ProtectedRoute;