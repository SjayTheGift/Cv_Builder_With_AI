// Navigation.js
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Adjust the path if necessary

const Navigation = () => {
  const { logout, user } = useAuth(); // Assuming you have a logout function in your AuthContext
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();

    if(success){
      navigate('/login')
    }
  }

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/view-resume" className="hover:underline">
            View Resume
          </Link>
          <Link to="/create-resume" className="hover:underline">
            Create Resume
          </Link>
        </div>
        <div className="relative group">
          <button className="flex items-center focus:outline-none">
            Profile
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="px-4 py-2 border border-b-gray-600 rounded-t-md">

                  {user && <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{user.email}</span> }
            </div>
            <Link to="/update-profile" className="block px-4 py-3 hover:bg-gray-200">
              Update Profile
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-3 hover:bg-gray-200 rounded-b-md hover:cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;