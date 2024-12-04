

import React, { ReactNode } from 'react'
import Navbar from '@/components/custom/Navbar'

export default function Layout({ children }: { children: ReactNode }) {
    return (<>
        <Navbar />
        {children}
    </>)
}
