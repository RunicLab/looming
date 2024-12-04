
"use client"
import React from 'react'
import { MaxWidthWrapper } from './max-width-wrapper'
import Link from 'next/link'
import { authClient } from '@/lib/auth/better-auth-client'
import { Button, buttonVariants } from '../ui/button'
import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { useAuthSession } from '@/hooks/use-auth-session'
import { Skeleton } from '../ui/skeleton'

export default function Navbar() {

    const { user, isLoading } = useAuthSession()

    const router = useRouter()

    const onSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/")
                }
            }
        })
    }

    return (
        <nav className='sticky z-[100] h-16 inset-x-0 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg transition-all'>
            <MaxWidthWrapper>
                <div className='flex h-16 items-center justify-between '>
                    <Link href={"/"} className='flex z-40 font-semibold'>
                        loom <span className='text-brand-700'>ing</span>
                    </Link>
                    <div className='h-full flex items-center space-x-4'>
                        {isLoading && (
                            <>
                                <Skeleton className='h-8 w-28 bg-brand-300' />
                            </>
                        )}
                        {!isLoading && (
                            user ? (
                                <>
                                    <Button size="sm" variant="ghost" className='hidden sm:flex' onClick={onSignOut}>Sign Out</Button>
                                    <Link href={"/dashboard"} className={buttonVariants({
                                        size: "sm",
                                        className: "flex items-center gap-1"
                                    })}>
                                        Dashboard <ArrowRight />
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href={"/pricing"} className={buttonVariants({
                                        size: "sm",
                                        variant: "ghost",
                                    })}>
                                        Pricing
                                    </Link>

                                    <Link href={"/sign-in"} className={buttonVariants({
                                        size: "sm",
                                        className: "hidden sm:flex items-center gap-1"
                                    })}>
                                        Join us <ArrowRight />
                                    </Link>
                                </>
                            ))
                        }
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    )
}
