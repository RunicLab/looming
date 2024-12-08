"use client"

import { Heading } from '@/components/primitives/Heading'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useRouter } from 'next/navigation'
import React, { ReactNode } from 'react'

interface Props {
    title: string
    children?: ReactNode
    hideBackButton?: boolean
    cta?: ReactNode
}

export default function DashboardLayoutWrapper({
    title,
    children,
}: Props) {
    const router = useRouter()
    return (
        <section className='flex-1 h-full w-full flex flex-col '>
            <div className='p-4 sm:p-2 flex justify-between border-b border-gray-200/30 '>
                <div className='flex flex-col sm:flex-row items-start gap-2 '>
                    <div className='flex items-center gap-1'>
                        <SidebarTrigger />
                        <Heading className='text-xl sm:text-2xl'>{title}</Heading>
                    </div>
                </div>
                <div></div>
            </div>
            <div className='flex-1 p-6 sm:p-8 flex flex-col overflow-y-auto '>{children}</div>
        </section>
    )
}

