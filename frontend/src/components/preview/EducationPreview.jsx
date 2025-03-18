import React from 'react'
import Educations from '../preview_single/Educations'

const EducationPreview  = ({resumeInfo}) => {
  return (
    <div className='my-6'>
      <h2 className="text-2xl font-semibold text-gray-800"
      style={{
        color:resumeInfo?.themeColor
      }}
      >
        EDUCATION
      </h2>

       <hr className='border-[1.5px] my-2' 
        style={{
            borderColor:resumeInfo?.themeColor
        }}/>

      {resumeInfo.educations && resumeInfo.educations.map((education, index) => 
        <Educations key={index} education={education} />
      )}
     
    </div>
  )
}

export default EducationPreview 