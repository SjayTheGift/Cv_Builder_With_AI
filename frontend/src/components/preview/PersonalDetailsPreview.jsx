import React from 'react'

const PersonalDetailsPreview = ({resumeInfo}) => {
  return (
    <div>
        <h2 className={`text-4xl font-bold text-center`}
        style={{
            color:resumeInfo?.themeColor
        }}>
            {resumeInfo?.firstname} {resumeInfo?.lastname}
        </h2>
        <h2 className='text-center text-sm font-medium'>{resumeInfo?.job_title}</h2>
        <h2 className='text-center font-semibold text-xs'>{resumeInfo?.address}</h2>

        <div className='flex justify-around items-center'>
            <h2 className='text-center font-semibold text-xs'
             style={{
                color:resumeInfo?.themeColor
            }}>
                Phone - {resumeInfo?.phone}
            </h2>
            <h2 className='text-center font-semibold text-xs'
             style={{
                color:resumeInfo?.themeColor
            }}>
                Email - {resumeInfo?.email}
            </h2>
        </div>

        <div className='flex justify-around items-center my-2'>
            <h2 className='text-center font-semibold text-xs'
             style={{
                color:resumeInfo?.themeColor
            }}>
                Website - {resumeInfo?.website}
            </h2>
            <h2 className='text-center font-semibold text-xs'
             style={{
                color:resumeInfo?.themeColor
            }}>
                Linkedin - {resumeInfo?.linkedin}
            </h2>
            <h2 className='text-center font-semibold text-xs'
             style={{
                color:resumeInfo?.themeColor
            }}>
                Github - {resumeInfo?.github}
            </h2>
        </div>

        <h2 className="text-2xl font-semibold my-3"
        style={{
            color:resumeInfo?.themeColor
        }}
        >PROFESSIONAL SUMMARY
        </h2>
        <hr className='border-[1.5px] my-2' 
        style={{
            borderColor:resumeInfo?.themeColor
        }}/>
    </div>
  )
}

export default PersonalDetailsPreview