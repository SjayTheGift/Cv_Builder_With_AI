import React from 'react'

const SummaryPreview = ({resumeInfo}) => {
  return (
    <div className='flex flex-wrap w-full'>
      <p className='mt-2 text-gray-700'>
            {
             resumeInfo?.summary
            } 
      </p>
    </div>
    
  )
}

export default SummaryPreview 