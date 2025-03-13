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
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const PasswordRestPage = () => {
    const [email, setEmail] = useState('');

    const { passwordReset } = useAuth();

    const handleSubmit = async (e) =>{
      e.preventDefault();

      if(email.trim() !== ''){

          await passwordReset(email)
          toast.success(`Email has been sent to ${email}`)
          setEmail('')
      }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-lg">
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Password Rest</CardTitle>
                    <CardDescription>
                        Enter your email below to rest password for your account
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

export default PasswordRestPage