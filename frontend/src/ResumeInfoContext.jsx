import React, { createContext, useContext, useEffect, useState } from 'react';
import dummy from '@/data/dummy'

const BASE_URL = import.meta.env.VITE_AUTH_BASE_URL

// Create the Auth Context
const ResumeInfoContext = createContext();

// Create the Auth Provider component
export const ResumeInfoProvider = ({ children }) => {
    const [resumeInfo, setResumeInfo] = useState();
    const [loading, setLoading] = useState(true);
    
    useEffect(() =>{
        setResumeInfo(dummy);
    },[])

    
    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            {children}
        </ResumeInfoContext.Provider>
    );
};

// Custom hook to use the Auth context
export const useResumeInfo = () => {
    return useContext(ResumeInfoContext);
};