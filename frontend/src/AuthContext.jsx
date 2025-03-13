import React, { createContext, useContext, useEffect, useState } from 'react';
import { data, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_AUTH_BASE_URL

// Create the Auth Context
const AuthContext = createContext();

// Create the Auth Provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessTokenExpireTime, setAccessTokenExpireTime] = useState(() => {
        // Retrieve initial expiration time from local storage
        const storedExpireTime = localStorage.getItem('accessTokenExpireTime');
        return storedExpireTime ? parseInt(storedExpireTime, 10) : null;
    });
    const navigate = useNavigate();

    // Login function
    const login = async (credentials) => {
        try{
            const response = await fetch(`${BASE_URL}login/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
                credentials: 'include', // Include cookies
            });

            const data = await response.json();

            if (response.ok) {
                const { expires_in } = data;
                const expirationTime = expires_in + Math.floor(Date.now() / 1000);
                console.log("time login", expirationTime)

                setAccessTokenExpireTime(expirationTime);
                localStorage.setItem('accessTokenExpireTime', expirationTime);
                setIsAuthenticated(true);

                navigate('/resume'); // Redirect to resume page
            } else {
                toast.error(data.error);
            }
        }catch (error) {
            console.log('Authentication error:', error);
        }
    };


    // Logout function
    const logout = async () => {
        try{

        const response = await fetch(`${BASE_URL}logout/`, {
            method: 'POST',
            credentials: 'include',
        });
            if(response.ok){
                navigate('/login')
                setIsAuthenticated(false);
                setAccessTokenExpireTime(null);
            }
        }
        catch (error) {
            console.log('Authentication error:', error);
        }
    };

    // Registration function
    const register = async (userData) => {
        const response = await fetch(`${BASE_URL}register/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
            credentials: 'include',
        });

        const data = await response.json();

        if (!data.ok) {
            for (const [key, value] of Object.entries(data.error)) {
                toast.error(`${value}`);
            }
        }
        else{
            navigate("/login")
            toast.success(data.detail)
        }
        return data;
    };

    // Password reset function
    const passwordReset = async (email) => {
        const response = await fetch(`${BASE_URL}password/reset/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
            credentials: 'include',
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
    };

    // Password confirm reset function
    const passwordConfirmReset = async (data) => {
        const response = await fetch(`${BASE_URL}password/confirm/reset/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
    };

    // Password confirm reset function
    const getProfile = async () => {
        const response = await fetch(`${BASE_URL}user/`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
        const data = await response.json();

        setUser(data)
        return user;
    };

    const get_authenticated = async () => {
        try {
            const response = await fetch(`${BASE_URL}authenticated/`, {
                method: 'POST',
                credentials: 'include',  // Important: Include credentials to send cookies
            });

            if(response.ok){
                setIsAuthenticated(true)
            }

        } catch (error) {
            console.error(error);
            setIsAuthenticated(false)
        }
        finally{
            setLoading(false)
        }
    };


    const refreshAccessToken = async () => {
        try {
            const response = await fetch(`${BASE_URL}token/refresh/`, {
                method: 'POST',
                credentials: 'include',  // Important: Include credentials to send cookies
            });

            if (response.ok) {
                setIsAuthenticated(true);
                const data = await response.json();
                const { expires_in } = data;
                
                const expirationTime = expires_in + Math.floor(Date.now() / 1000);
                console.log("time refresh", expirationTime)

                setAccessTokenExpireTime(expirationTime);
                localStorage.setItem('accessTokenExpireTime', expirationTime); // Update in localStorage
            }else{
                await logout();
                setIsAuthenticated(false);
            }
           
        } catch (error) {
            console.error('Token refresh error:', error);
            setIsAuthenticated(false)
            logout(); // Optionally log out if refresh fails
        }
    };

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

    return (
        <AuthContext.Provider value={{ 
            user, 
            isAuthenticated, 
            setIsAuthenticated, 
            refreshAccessToken, 
            login, 
            logout, 
            register, 
            passwordReset, 
            passwordConfirmReset,
            getProfile, 
            loading, 
            accessTokenExpireTime
            }}>

            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the Auth context
export const useAuth = () => {
    return useContext(AuthContext);
};