"use client"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function SidebarUserSignin() {

    const router = useRouter()
    return (
        <div className='flex items-center justify-center h-12 w-full gap-2 p-2 bg-brand-400/20 rounded-xl'>
            <Button size="sm" variant="outline" className='hidden w-full sm:flex' onClick={() => router.push("/sign-in")}>Sign In</Button>
        </div>
    )

}

