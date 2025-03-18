import { useContext, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react';
import PersonalDetail from './forms/PersonalDetail';
import { useResumeInfo } from '../ResumeInfoContext';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';

const FormSection = () => {
  const { resumeInfo, setResumeInfo, createResume, updateResume, getSingleResume } = useResumeInfo();
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  
  useEffect(() => {
    if (resumeInfo.id) {
      // If the resume ID is available, fetch the resume data
      getSingleResume(resumeInfo.id);
    }
  }, []);

  const handlePrevious = () => {
    if (activeFormIndex > 1) {
      setActiveFormIndex(activeFormIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeFormIndex < 3) { // Assuming there are 3 forms
      setActiveFormIndex(activeFormIndex + 1);
    }
  };

  return (
    <div className='my-6'>
      <div className='flex justify-between items-center mb-5 mt-2'>
        <Button variant="outline" size="sm" className="flex gap-2">
          <LayoutGrid />
          Theme
        </Button>
        <div className='flex justify-between items-center gap-2'>
          {activeFormIndex > 1 && (
            <Button className="flex gap-2" size="sm" onClick={handlePrevious}>
              <ArrowLeft />
              Previous 
            </Button>
          )}
          <Button className="flex gap-2" size="sm" onClick={handleNext}>
            Next
            <ArrowRight />
          </Button>
        </div>
      </div>
      {/* Personal Detail */}
      {activeFormIndex === 1 && (
        <PersonalDetail 
          resumeInfo={resumeInfo} 
          setResumeInfo={setResumeInfo} 
          createResume={createResume}
        />
      )}

      {/* Experience */}
      {activeFormIndex === 2 && (
        <ExperienceForm 
          resumeInfo={resumeInfo} 
          setResumeInfo={setResumeInfo} 
          updateResume={updateResume}
        />
      )}

      {/* Education */}
      {activeFormIndex === 3 && (
        <EducationForm 
          resumeInfo={resumeInfo} 
          setResumeInfo={setResumeInfo} 
          updateResume={updateResume}
        />
      )}
    </div>
  );
};

export default FormSection;