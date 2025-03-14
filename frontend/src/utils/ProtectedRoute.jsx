// utils/ProtectedRoute.js
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Adjust the import path as necessary

const ProtectedRoute = ({ children }) => {

  const {  get_authenticated, getProfile, accessTokenExpireTime, isAuthenticated, loading, setAccessTokenExpireTime, refreshAccessToken } = useAuth();

  useEffect(() => {
    get_authenticated();
    getProfile();
    const setRefreshTimer = () => {
        if (isAuthenticated && accessTokenExpireTime) {
            const currentTime = Math.floor(Date.now() / 1000);
            const timeRemaining = accessTokenExpireTime - currentTime;

            // Set an interval to refresh the token 30 seconds before it expires
            if (timeRemaining > 30) {
                const refreshTimeout = setTimeout(refreshAccessToken, (timeRemaining - 30) * 1000);
                return refreshTimeout; // Return the timeout ID for cleanup
            }
        }
        return null; // No timeout needed
    };

    const refreshInterval = setRefreshTimer();

    return () => {
        if (refreshInterval) clearTimeout(refreshInterval);
    };
}, [isAuthenticated, accessTokenExpireTime]);

  if(loading){
    return <div>Loading...</div>
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;