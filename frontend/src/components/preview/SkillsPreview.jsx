import React from 'react'

const SkillsPreview = ({resumeInfo}) => {
  return (
    <div className='my-6'>
        <h2 className="text-2xl font-semibold text-gray-800"
        style={{
          color:resumeInfo?.themeColor
        }}
        >
          SKILLS
        </h2>
        <hr className='border-[1.5px] my-2' 
          style={{
              borderColor:resumeInfo?.themeColor
        }}/>
        <div className='my-5 flex flex-wrap gap-3'>
          {resumeInfo.skills &&
          
          resumeInfo?.skills?.map((skill, index)=>
            <p className='text-xs p-2 rounded-md' style={{backgroundColor:resumeInfo?.themeColor}} key={index}>
              {skill.name}
            </p>
          )
          }
        </div>
    </div>
  )
}

export default SkillsPreview