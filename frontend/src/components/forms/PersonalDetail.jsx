import React, { useState } from 'react'

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
import { Textarea } from "@/components/ui/textarea"

const PersonalDetail = ({ resumeInfo, setResumeInfo, setIsDisabled, createResume }) => {


//   const {
//     firstname,
//     lastname,
//     job_title,
//     address,
//     phone,
//     email,
//     website,
//     linkedin,
//     github,
//     summary
// } = resumeInfo

//   const handleInputChange = (e) =>{
//     // setIsDisabled(false);
//     const { name, value } = e.target;

//     setResumeInfo({
//       ...resumeInfo,
//       [name]:value
//     })
//   }

//   const handleSave = async () =>{

//     if(firstname.trim() !== '' &&  lastname.trim() !== '' && job_title.trim() !== '' 
//     &&  address.trim() !== '' && phone.trim() !== '' &&  email.trim() !== '' && website.trim() !== '' 
//     &&  linkedin.trim() !== '' && github.trim() !== '' && summary.trim() !== '' 
//   ){
//         let resume = {
//           firstname,
//           lastname,
//           job_title,
//           address,
//           phone,
//           email,
//           website,
//           linkedin,
//           github,
//           summary
//         }
        
//         await createResume(resume)
//     }
//     // setIsDisabled(true);
// }


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResumeInfo({
      ...resumeInfo,
      [name]: value,
    });
  };

  const handleSave = async () => {
    const resume = { ...resumeInfo };
    await createResume(resume);
  };

  return (
    <Card className="border-t-primary border-t-4">
      <CardHeader>
        <CardTitle className="text-2xl">Personal Detail</CardTitle>
        <CardDescription>
          Get Started with the basic information,
          Please make sure you save before going to next page
        </CardDescription>
      </CardHeader>
      <CardContent>
      <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
                <Label htmlFor="first-name">First Name *</Label>
                <Input
                id="first-name"
                type="text"
                name="firstname"
                required
                value={resumeInfo.firstname}
                onChange={handleInputChange}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="last-name">Last Name *</Label>
                <Input
                id="last-name"
                type="text"
                name="lastname"
                value={resumeInfo.lastname}
                required
                onChange={handleInputChange}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="job-title">Job Title *</Label>
                <Input
                id="job-title"
                type="text"
                name="job_title"
                value={resumeInfo.job_title}
                required
                className="my-2"
                onChange={handleInputChange}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                id="email"
                type="email"
                name="email"
                value={resumeInfo.email}
                required
                onChange={handleInputChange}
                />
            </div>
            <div className="col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                id="address"
                type="text"
                name="address"
                value={resumeInfo.address}
                required
                className="my-2"
                onChange={handleInputChange}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                id="Phone"
                type="text"
                name="phone"
                value={resumeInfo.phone}
                required
                onChange={handleInputChange}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="website">Website</Label>
                <Input
                id="website"
                type="text"
                name="website"
                value={resumeInfo.website}
                onChange={handleInputChange}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="phone">Linkedin</Label>
                <Input
                id="Phone"
                type="text"
                name="linkedin"
                value={resumeInfo.linkedin}
                onChange={handleInputChange}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="github">Github</Label>
                <Input
                id="github"
                type="text"
                name="github"
                value={resumeInfo.github}
                onChange={handleInputChange}
                />
            </div>            
            <div className='col-span-2'>
              <Label htmlFor="summary" className="my-2">Professional Summary *</Label>
              <Textarea 
              minLength={6} // Set minimum length
              maxLength={300} // Set maximum length (adjust as needed)
              id='summary' 
              placeholder="Tell us a little bit about yourself."
              name="summary"
              value={resumeInfo.summary}
              onChange={handleInputChange}
              style={{ resize: 'none', width: '100%', height: '8rem'}} // Adjust height here
              />
            </div>
          </div>
          <div className='flex justify-end'>
            <Button onClick={handleSave} type="button" className="cursor-pointer mt-4">
                Save
            </Button>
          </div>
      </form>
      </CardContent>
  </Card>
  )
}

export default PersonalDetail