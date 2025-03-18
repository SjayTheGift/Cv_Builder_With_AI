import React from 'react';
import Experiences from '../preview_single/Experiences'; // Ensure this path is correct

const ExperiencePreview = ({ resumeInfo }) => {
  return (
    <div className='my-6'>
      <h2 className="text-2xl font-semibold text-gray-800"
      style={{
        color: resumeInfo?.themeColor
      }}>
        WORK HISTORY
      </h2>

      <hr className='border-[1.5px] my-2' 
        style={{
            borderColor: resumeInfo?.themeColor
        }}/>

      {resumeInfo.experiences && resumeInfo.experiences.map((experience, index) => 
        <Experiences key={index} experience={experience} />
      )}
    </div>
  );
}

export default ExperiencePreview;