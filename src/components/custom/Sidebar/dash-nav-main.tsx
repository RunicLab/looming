"use client"

import { Home, Inbox, Search, Sparkles, Trash, type LucideIcon } from "lucide-react"

import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

export function DashNavMain() {
    const items: any = [
        {
            title: "Home",
            url: "#",
            icon: Home,
            isActive: true,
        },
        {
            title: "Unsorted",
            url: "#",
            icon: Inbox,
            badge: "10",
        },
        {
            title: "Trash can",
            url: "#",
            icon: Trash,
            badge: "10",
        },

    ]
    return (
        <SidebarGroup className="">
            <SidebarMenu className="">
                {items.map((item: any) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={item.isActive}>
                            <a href={item.url}>
                                <item.icon />
                                <span>{item.title}</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}

