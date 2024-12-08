"use client"
import { Home, Inbox, Save, Trash } from "lucide-react"
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import Link from "next/link"

export function DashNavMain() {
    const pathname = usePathname()

    const items: any = [
        {
            title: "Home",
            url: "/dashboard",
            icon: Home,
            isActive: pathname === "/dashboard"
        },
        {
            title: "Unsorted",
            url: "/dashboard/unsorted",
            icon: Inbox,
            isActive: pathname === "/dashboard/unsorted"
        },
        {
            title: "Saved boxes",
            url: "/dashboard/saved",
            icon: Save,
            isActive: pathname === "/dashboard/saved"
        },

        {
            title: "Trash can",
            url: "/dashboard/trash",
            icon: Trash,
            isActive: pathname === "/dashboard/trash"
        },

    ]
    return (
        <SidebarGroup className="">
            <SidebarMenu className="">
                {items.map((item: any) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={item.isActive}>
                            <Link href={item.url}>
                                <item.icon />
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}

