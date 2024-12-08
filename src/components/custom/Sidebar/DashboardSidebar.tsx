"use client"

import { Bookmark } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { DashNavMain } from "./dash-nav-main"
import { NavUser } from "./dash-nav-user"
import { NavBoxesSection } from "./dash-nav-boxes"
import { useAuthSession } from "@/hooks/use-auth-session"
import { NavProjectsSkeleton } from "./dash-nav-skeleton"
import SidebarUserSignin from "./dash-nav-user-sign-in"
import { SearchForm } from "./dash-nav-search"

export function DashboardSidebar() {

    const { user, isLoading } = useAuthSession()

    return (
        <Sidebar variant="inset" className="">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="/">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Bookmark className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">Loomi dot ng</span>
                                    <span className="">v1.0.0</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SearchForm />
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="p-1">
                {isLoading ?
                    <NavProjectsSkeleton />
                    : (
                        user ? ( // only is signed in
                            <>
                                <DashNavMain />
                                <NavBoxesSection />
                            </>
                        ) : (
                            <>
                                {/* 
                                    */}
                                <SidebarUserSignin />
                            </>
                        )
                    )
                }
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    )
}
