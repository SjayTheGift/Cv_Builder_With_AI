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
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'react-toastify';

const ExperienceForm = ({ resumeInfo, setResumeInfo, updateResume }) => {
  const [experiences, setExperiences] = useState([{ job_title: '', company: '', start_date: '', end_date: '', description: '' }]);

  useEffect(() => {
    setResumeInfo((prevResumeInfo) => ({
      ...prevResumeInfo,
      experience: experiences,
    }));
  }, [experiences, setResumeInfo, resumeInfo.experiences]);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newExperiences = experiences.map((experience, i) =>
      i === index ? { ...experience, [name]: value } : experience
    );
    setExperiences(newExperiences);
  };

  const handleAddExperience = () => {
    setExperiences([...experiences, { job_title: '', company: '', start_date: '', end_date: '', description: '' }]);
  };

  const handleRemoveExperience = (index) => {
    const newExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(newExperiences);
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

      // Build the resume object to send
      const resume = { 
          ...resumeInfo, 
          experiences: experiences.map(exp => ({
              ...exp,
              end_date: exp.end_date || null // Set to null if empty
          }))
      };

      try {
          await updateResume(resume);
          toast.success("Resume updated successfully!");
      } catch (error) {
          console.error("Failed to update resume:", error.message);
          toast.error("Failed to update resume: " + error.message);
      }
  };

  return (
    <Card className="border-t-primary border-t-4">
      <CardHeader>
        <CardTitle className="text-2xl">Experience</CardTitle>
        <CardDescription>
          Enter your job experience
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {experiences.map((experience, index) => (
            <div key={index} className="mb-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-2">
                  <Label htmlFor={`job_title_${index}`}>Job Title *</Label>
                  <Input
                    id={`job_title_${index}`}
                    type="text"
                    name="job_title"
                    required
                    value={experience.job_title}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`company_${index}`}>Company *</Label>
                  <Input
                    id={`company_${index}`}
                    type="text"
                    name="company"
                    required
                    value={experience.company}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`start_date_${index}`}>Start Date *</Label>
                  <Input
                    id={`start_date_${index}`}
                    type="date"
                    name="start_date"
                    required
                    value={experience.start_date}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`end_date_${index}`}>End Date</Label>
                  <Input
                    id={`end_date_${index}`}
                    type="date"
                    name="end_date"
                    value={experience.end_date}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </div>
                <div className='col-span-2'>
                  <Label htmlFor={`description_${index}`} className="my-2">Professional Summary *</Label>
                  <Textarea
                    minLength={6}
                    maxLength={300}
                    id={`description_${index}`}
                    placeholder="Tell us a little bit about yourself."
                    name="description"
                    value={experience.description}
                    onChange={(e) => handleInputChange(index, e)}
                    style={{ resize: 'none', width: '100%', height: '8rem' }}
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

export default ExperienceForm;