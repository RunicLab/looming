import { ReactNode } from "react"
import { db } from '@/lib/db'
import { auth } from "@/lib/auth/better-auth"
import { redirect } from 'next/navigation'
import { headers } from "next/headers"

const Layout = async ({ children }: { children: ReactNode }) => {

    const session = await auth.api.getSession({
        headers: headers(),
    })

    if (!session) {
        redirect("/sign-in")
    }

    const user = await db.user.findUnique({
        where: { id: session.user.id },
    })

    if (!user) {
        redirect("/sign-in")
    }


    return (
        <>
            {children}
        </>
    )
}

export default Layout
