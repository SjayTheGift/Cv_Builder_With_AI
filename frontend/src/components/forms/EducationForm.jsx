import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from 'react-toastify';

const EducationForm = ({ resumeInfo, setResumeInfo, updateResume }) => {
  const [educations, setEducation] = useState([{ degree: '', institution: '', graduation_date: '' }]);

  useEffect(() => {
    setResumeInfo((prevResumeInfo) => ({
      ...prevResumeInfo,
      educations: educations,
    }));
  }, [educations, setResumeInfo, resumeInfo.educations]);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newEducations = educations.map((education, i) =>
      i === index ? { ...education, [name]: value } : education
    );
    setEducation(newEducations);
  };

  const handleAddExperience = () => {
    setEducation([...educations, { degree: '', institution: '', graduation_date: '' }]);
  };

  const handleRemoveExperience = (index) => {
    const newEducations = educations.filter((_, i) => i !== index);
    setEducation(newEducations);
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

      // Build the resume object to send
      const resume = { 
          ...resumeInfo, 
          educations: educations
      };

      console.log(resume)

      try {
          await updateResume(resume);
          toast.success("Resume updated education!");
      } catch (error) {
          console.error("Failed to update resume:", error.message);
          toast.error("Failed to update resume: " + error.message);
      }
  };

  return (
    <Card className="border-t-primary border-t-4">
      <CardHeader>
        <CardTitle className="text-2xl">Education</CardTitle>
        <CardDescription>
          Enter your education level
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {educations.map((education, index) => (
            <div key={index} className="mb-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-2">
                  <Label htmlFor={`degree_${index}`}>Degree *</Label>
                  <Input
                    id={`degree_${index}`}
                    type="text"
                    name="degree"
                    required
                    value={education.degree}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`institution_${index}`}>Institution *</Label>
                  <Input
                    id={`institution_${index}`}
                    type="text"
                    name="institution"
                    required
                    value={education.institution}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`graduation_date_${index}`}>Graduation_date *</Label>
                  <Input
                    id={`graduation_date_${index}`}
                    type="date"
                    name="graduation_date"
                    required
                    value={education.graduation_date}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </div>
              </div>
              <div className='flex justify-between mt-2'>
                <Button type="button" onClick={() => handleRemoveExperience(index)} className="bg-red-500 text-white">
                  Remove
                </Button>
              </div>
            </div>
          ))}
          <div className='flex justify-end'>
            <Button type="button" onClick={handleAddExperience} className="cursor-pointer mt-4">
              Add More
            </Button>
            <Button type="submit" className="cursor-pointer mt-4 ml-2">
              Save
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default EducationForm;