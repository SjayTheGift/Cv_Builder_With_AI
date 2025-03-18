import React from 'react'

const Educations  = ({education}) => {
  return (
    <div className='my-3'>
      <h3 className='text-xl font-bold text-gray-800'>{education.institution}</h3>
      <h2 className='font-medium text-gray-600 flex justify-between'>
        {education.degree}
        <span>{education.graduation_date}</span>
        </h2>
    </div>
  )
}

export default Educations 