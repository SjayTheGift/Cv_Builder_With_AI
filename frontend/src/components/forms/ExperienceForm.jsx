import React from 'react'

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

const PersonalDetail = ({ resumeInfo, setResumeInfo }) => {


  const handleInputChange = (e) =>{
    const { name, value } = e.target;

    console.log(value, name)

    setResumeInfo({
      ...resumeInfo,
      [name]:value
    })
  }

  console.log(resumeInfo)

  const handleSubmit = async (e) =>{
    e.preventDefault();

    // if(email.trim() !== '' &&  password.trim() !== ''){
    //     let credentials = {
    //         email,
    //         password
    //     }
        
    //     await login(credentials)
    // }

}

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
      <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
                <Label htmlFor="first-name">First Name *</Label>
                <Input
                id="first-name"
                type="text"
                name="firstname"
                required
                onChange={handleInputChange}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="last-name">Last Name *</Label>
                <Input
                id="last-name"
                type="text"
                name="lastname"
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
                onChange={handleInputChange}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="phone">Linkedin</Label>
                <Input
                id="Phone"
                type="text"
                name="linkedin"
                required
                onChange={handleInputChange}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="github">Github</Label>
                <Input
                id="github"
                type="text"
                name="github"
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
              onChange={handleInputChange}
              style={{ resize: 'none', width: '100%', height: '8rem'}} // Adjust height here
              />
            </div>
          </div>
          <div className='flex justify-end'>
            <Button type="submit" className="cursor-pointer mt-4">
                Save
            </Button>
          </div>
      </form>
      </CardContent>
  </Card>
  )
}

export default PersonalDetail