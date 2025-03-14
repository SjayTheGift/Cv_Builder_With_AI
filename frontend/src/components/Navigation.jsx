import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Adjust the path if necessary
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Navigation = () => {
  const { logout, user, updateProfile } = useAuth(); 
  const [openDialog, setOpenDialog] = useState(false);
  const [email, setEmail] = useState(user?.email || '');

  const navigate = useNavigate();


  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleSubmit = async () => {
    if (email.trim() !== '') {
      if (email.length < 8) {
        toast.error("Email must be at least longer than 8 characters");
      } else {
        try {
          await updateProfile(email);
          handleClose();  // Close the dialog after successfully updating
        } catch (error) {
          toast.error("Failed to update profile. Please try again.");
        }
      }
    } else {
      toast.error("Email cannot be empty");
    }
  };

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      navigate('/login');
    }
  }

  useEffect(() => {
    // Initialize email state with the current user's email when the dialog opens.
    if (openDialog) {
      setEmail(user?.email || '');
    }
  }, [openDialog, user]);

  return (
    <>
      <nav className="bg-gray-800 text-white p-4 fixed w-full">
        <div className="w-[80%] mx-auto flex justify-between items-center px-4 py-2">
          <div className="flex space-x-4">
            <Link to="/dashboard" className="hover:underline">
              View Resumes
            </Link>
          </div>
          <div className="relative group">
            <button className="flex items-center focus:outline-none">
              Profile
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="px-4 py-2 border border-b-gray-600 rounded-t-md">
                {user && <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{user.email}</span>}
              </div>
              <div onClick={() => setOpenDialog(true)} className="block px-4 py-3 hover:bg-gray-200 cursor-pointer">
                Update Profile
              </div>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-3 hover:bg-gray-200 rounded-b-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="col-span-3" 
                type="email"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleSubmit} className="cursor-pointer">Save Changes</Button> 
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navigation;