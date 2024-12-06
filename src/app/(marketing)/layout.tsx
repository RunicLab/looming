

import React, { ReactNode } from 'react'
import Navbar from '@/components/custom/Headers/LandingNavbar'

export default function Layout({ children }: { children: ReactNode }) {
    return (<>
        <Navbar />
        {children}
    </>)
}
