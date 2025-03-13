import { useState } from 'react'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { toast } from 'react-toastify';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();

        if(email.trim() !== '' &&  password.trim() !== '' && passwordAgain.trim() !== ''){

            if(password !== passwordAgain){
              toast.error("password do not match")
            }
            else if(password.length < 3){
              toast.error("password length must be greater than 3")
            }
            else{
              let credentials = {
                email,
                password
            }
              await register(credentials)
            } 
        }
    }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-lg">
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader>
                <CardTitle className="text-2xl">Create an account</CardTitle>
                  <CardDescription>
                      If you don't have an account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        </div>
                        <Input 
                            id="password" 
                            type="password" 
                            required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                        <Label htmlFor="password-again">Password</Label>
                        </div>
                        <Input 
                            id="password-again" 
                            type="password" 
                            required 
                            value={passwordAgain}
                            onChange={(e) => setPasswordAgain(e.target.value)}
                        />
                    </div>
                    <Button type="submit" className="w-full cursor-pointer">
                        Sign up
                    </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                    Already have an account? {" "}
                    <Link to="/login" className="underline underline-offset-4">
                        Login here
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

export default RegisterPage