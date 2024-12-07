import { ReactNode } from "react"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/custom/Sidebar/DashboardSidebar"
import { cookies } from "next/headers"

const Layout = async ({ children }: { children: ReactNode }) => {

    const cookieStore = cookies()
    const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <DashboardSidebar />
            <SidebarInset className="p-4 flex-col bg-white w-full">
                <SidebarTrigger />
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}

export default Layout
