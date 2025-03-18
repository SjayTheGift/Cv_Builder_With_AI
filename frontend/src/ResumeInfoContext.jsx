import React, { createContext, useContext, useEffect, useState } from 'react';

const BASE_RESUME_URL = import.meta.env.VITE_RESUME_BASE_URL;

// Create the Resume Context
const ResumeInfoContext = createContext();

// Create the Resume Provider component
export const ResumeInfoProvider = ({ children }) => {
    const [resumeInfo, setResumeInfo] = useState({
        firstname: "",
        lastname: "",
        job_title: "",
        address: "",
        phone: "",
        email: "",
        website: "",
        linkedin: "",
        github: "",
        themeColor: "",
        summary: "",
        experiences: [],
        educations: [],
        skills: []
    });
    
    const createResume = async (resume) => {
        const response = await fetch(`${BASE_RESUME_URL}create/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(resume),
            credentials: 'include',
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        const data = await response.json();
        setResumeInfo(data);
    };

    const updateResume = async (resumeInfo) => {
        const response = await fetch(`${BASE_RESUME_URL}${resumeInfo.id}/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(resumeInfo),
            credentials: 'include',
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        const data = await response.json();
        setResumeInfo(data);
    };


    useEffect(() =>{

    },[resumeInfo])

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo, createResume, updateResume }}>
            {children}
        </ResumeInfoContext.Provider>
    );
};

// Custom hook to use the Resume context
export const useResumeInfo = () => {
    return useContext(ResumeInfoContext);
};