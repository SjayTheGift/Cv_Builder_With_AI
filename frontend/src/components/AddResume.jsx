import { PlusSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const AddResume = () => {
  
  return (
    <div>
      <Link to='/resume' className='p-14 py-24 border 
                      items-center flex h-[280px] w-[250px]
                      justify-center bg-secondary rounded-lg 
                      mt-4 hover:scale-105 transition-all hover:shadow-md cursor-pointer'
      >
        <PlusSquare size={30}/>
      </Link>
    </div>
  );
};

export default AddResume;