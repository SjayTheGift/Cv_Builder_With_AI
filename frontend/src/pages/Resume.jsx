import { useEffect, useState } from 'react'
import FormSection from '../components/FormSection'
import ResumePreview from '../components/ResumePreview'
import { ResumeInfoProvider } from '../ResumeInfoContext'

const Resume = () => {

  return (
    <ResumeInfoProvider>
        <section id='resume' className='w-full h-screen p-3 py-16 text-black'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                {/* Form Section */}
                    <FormSection />
                {/* Preview Section */}
                    <ResumePreview />
            </div>
    </section>
    </ResumeInfoProvider>
  )
}

export default Resume