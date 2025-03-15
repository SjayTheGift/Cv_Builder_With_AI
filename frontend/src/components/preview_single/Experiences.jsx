import React from 'react'

const Experiences  = ({experience}) => {
  return (
    <div className='my-1'>
      <h3 className='text-xl font-bold text-gray-800'>{experience?.job_title}</h3>
      <h2 className='font-medium text-gray-600 flex justify-between'>
        {experience?.company},
        {experience?.city},
        {experience?.state}

        <span>{experience?.start_date} - {experience?.end_date ? experience?.end_date : 'present'}</span>
        </h2>
          <ul className="list-disc list-inside mt-2 text-gray-700">
            <li>Worked closely with other developers, UX designers, and big data analysts to create cohesive finished products.</li>
            <li>Designed and developed reports in SQL Server Reporting Services.</li>
            <li>Deployed new front-end features, capturing higher performance metrics than previous averages.</li>
            <li>Increased user experience scores by practicing innovative forward-thinking, overcoming challenges creatively.</li>
            <li>Developed and implemented high-performing scanning components using SQL Server.</li>
          </ul>
    </div>
  )
}

export default Experiences