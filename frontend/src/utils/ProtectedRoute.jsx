// utils/ProtectedRoute.js
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Adjust the import path as necessary

const ProtectedRoute = ({ children }) => {

  const {  get_authenticated, accessTokenExpiration, isAuthenticated, loading, setIsAuthenticated, refreshAccessToken } = useAuth();

  // useEffect(() => {
  //   auth().catch(() => setIsAuthenticated(false))
  //   get_authenticated();
  // }, [])

 

  // const auth = async () => {
  //   const now = Date.now() / 1000;

  //     if (accessTokenExpiration < now) {
  //         await refreshAccessToken();
  //     } else {
  //       setIsAuthenticated(true);
  //     }
  // };


  if(loading){
    return <div>Loading...</div>
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;