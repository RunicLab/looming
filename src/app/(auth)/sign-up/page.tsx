"use client"

import React from 'react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Icons } from '@/components/icons';
import { authClient } from '@/lib/auth/better-auth-client';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const router = useRouter()

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        await authClient.signUp.email({
            email,
            password,
            name

        }, {
            onRequest: (ctx) => {
                setIsLoading(true);
            },
            onSuccess: () => {
                router.push("/dashboard")
                toast.success("Successfully signed in!");
            },
            onError: (ctx) => {
                console.log(ctx.error.message)
                toast.error(ctx.error.message || "Something went wrong");
            }
        })

        setIsLoading(false);
    };

    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: "google"
        }, {
            onRequest: () => {
                setIsGoogleLoading(true);
            },
            onSuccess: () => {
                toast.success("Successfully signed in with Google!");
                //router.push("/dashboard")
            },
            onError: (ctx) => {
                console.log(ctx.error)
                toast.error(ctx.error.message || "Something went wrong");
            }
        })
        setIsGoogleLoading(false);
    };

    return (
        <div className="w-full flex flex-col flex-1 items-center justify-center ">
            <Card className="w-full max-w-md p-2 shadow-lg">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-xl">Create your account</CardTitle>
                    <CardDescription>
                        Welcome to loomi.ng! Please signup to continue
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    {/* Google Sign In  */}
                    <Button
                        variant="outline"
                        className="w-full py-5 relative group flex items-center gap-2"
                        onClick={handleGoogleSignIn}
                        disabled={isGoogleLoading || isLoading}
                    >
                        {isGoogleLoading ? (
                            <Loader2 className="size-5 animate-spin" />
                        ) : (
                            <Icons.google className='size-4 ' />
                        )}
                        <span className='text-gray-500 transition duration-200 group-hover:text-gray-800'>Continue with Google</span>
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <Separator className="w-full" />
                        </div>
                        <div className="relative flex justify-center text-xs ">
                            <span className="bg-white px-2 text-gray-500">Or</span>
                        </div>
                    </div>

                    {/* Email Sign In Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Full Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder=""
                                className="w-full px-3 py-5"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={isLoading || isGoogleLoading}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                className="w-full px-3 py-5"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading || isGoogleLoading}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                className="w-full px-3 py-5 "
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading || isGoogleLoading}
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full py-5"
                            disabled={isLoading || isGoogleLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="size-5 animate-spin mr-2" />
                            ) : null}
                            Sign Up!
                        </Button>
                    </form>
                </CardContent>

                <CardFooter>
                    <p className="text-sm text-center text-gray-600 w-full">
                        Already have an account?{' '}
                        <Button
                            variant="link"
                            className="px-0 text-sm text-gray-900 hover:text-gray-900"
                            disabled={isLoading || isGoogleLoading}
                            onClick={() => {
                                router.push("/sign-in")
                            }}
                        >

                            Sign in
                        </Button>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
