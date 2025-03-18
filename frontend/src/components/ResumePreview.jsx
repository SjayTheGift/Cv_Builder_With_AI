import PersonalDetailsPreview  from './preview/PersonalDetailsPreview';
import { useResumeInfo } from '../ResumeInfoContext';
import ExperiencePreview from './preview/ExperiencePreview';
import EducationPreview from './preview/EducationPreview';
import SkillsPreview from './preview/SkillsPreview';

const ResumePreview = () => {

    const { resumeInfo, setResumeInfo } = useResumeInfo();

  return (
    <div className='shadow-lg h-full p-14 border-t-[20px] my-6' style={{
        borderColor:resumeInfo?.themeColor
    }} >
        {/* Personal Detail */}
            <PersonalDetailsPreview   resumeInfo={resumeInfo}/>
        {/* Experience */}
            <ExperiencePreview resumeInfo={resumeInfo}/>
        {/* Education */}
            <EducationPreview resumeInfo={resumeInfo}/>
        {/* Skills */}
            <SkillsPreview  resumeInfo={resumeInfo}/>
    </div>
  )
}

export default ResumePreview