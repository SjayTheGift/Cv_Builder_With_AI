import { useContext, useState } from 'react'
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react';
import PersonalDetail from './forms/PersonalDetail';
import { useResumeInfo } from '../ResumeInfoContext';

const FormSection = () => {

  const { resumeInfo, setResumeInfo } = useResumeInfo();
  const [activeFormIndex, setActiveFormIndex] = useState(1);

  const [isDisabled, setIsDisabled] = useState(false); // State to manage button disable

  return (
    <div className='my-6'>
      <div className='flex justify-between items-center mb-5 mt-2'>
        <Button variant="outline" size="sm" className="flex gap-2">
          <LayoutGrid />
          Theme
        </Button>
        <div className='flex justify-between items-center gap-2'>
          {activeFormIndex > 1 &&
            <Button className="flex gap-2" size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
            <ArrowLeft />
            Previous 
          </Button>
          }
          <Button className="flex gap-2" size="sm"
          onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          disabled={!isDisabled} // Use disabled prop directly
          >
            Next
            <ArrowRight />
          </Button>
        </div>
      </div>
      {/* Personal Detail */}
      {
        activeFormIndex == 1 &&
        <PersonalDetail resumeInfo={resumeInfo} setResumeInfo={setResumeInfo} setIsDisabled={setIsDisabled}/>
      }
        
      {/* Summary */}

      {/* Experience */}

      {/* Education */}

      {/* Skills */}

    </div>
  )
}

export default FormSection