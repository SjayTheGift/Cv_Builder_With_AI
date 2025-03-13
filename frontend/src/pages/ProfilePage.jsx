import React from 'react';
import { useAuth } from '../AuthContext';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const ProfilePage = () => {
    const { user } = useAuth(); // Access the user details from Auth Context

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-lg">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">Profile</CardTitle>
                        <CardDescription>
                            Here is your email address.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-4">
                            {user ? (
                                <>
                                    <p className="text-lg"><strong>Email:</strong> {user.email}</p>
                                </>
                            ) : (
                                <p className="text-red-500">No user currently logged in.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default ProfilePage;