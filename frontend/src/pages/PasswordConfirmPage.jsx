import { useState } from 'react'
import { Button } from "@/components/ui/button";
import { toast } from 'react-toastify';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import queryString from 'query-string'; // Import query-string

const PasswordConfirmPage = () => {
    const [password, setPassword] = useState('');
    const { passwordConfirmReset } = useAuth();
    const navigate = useNavigate();
    const location = useLocation(); // Get the location object
    const { uid, token } = queryString.parse(location.search); // Parse query parameters


    const handleSubmit = async (e) =>{
      e.preventDefault();

      console.log(token)

      if(password.trim() !== ''){
          const data = {
            uid,
            token,
            password
          }
          await passwordConfirmReset(data);
          toast.success('Password has been rest');
          navigate('/login');
          setEmail('');
      }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-lg">
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Rest Password</CardTitle>
                    <CardDescription>
                        Create a new password for your Resume-Builder account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <div className="flex items-center">
                        <Label htmlFor="password">New Password</Label>
                        </div>
                        <Input 
                            id="password" 
                            type="password" 
                            required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button type="submit" className="w-full cursor-pointer">
                        Rest Password
                    </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                    <Link to="/login" className="underline underline-offset-4">
                        Go Back
                    </Link>
                    </div>
                </form>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}

export default PasswordConfirmPage