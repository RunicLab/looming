"use client"

import {
    Boxes,
    Folder,
    Forward,
    MoreHorizontal,
    Plus,
    Trash2,
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import CreateBoxModal from "@/components/modals/create-box-modal"
import { useQuery } from "@tanstack/react-query"
import { client } from "@/lib/client"
import { Skeleton } from "@/components/ui/skeleton"

export function NavBoxesSection() {
    const { isMobile } = useSidebar()

    const { data: boxes, isLoading } = useQuery({
        queryKey: ["get-user-boxes"],
        queryFn: async () => {
            const response = await client.box.getUserBox.$get()
            return await response.json()
        },
        refetchOnWindowFocus: true,
        staleTime: 10 * 1000, // cache for 10 seconds
        retry: 3, // retry 3 times if request fails
    })

    const SkeletonItems = () => (
        <>
            {[...Array(5)].map((_, index) => (
                <SidebarMenuItem key={`skeleton-${index}`}>
                    <SidebarMenuButton asChild>
                        <div className="flex items-center space-x-2 w-full">
                            <Skeleton className="h-5 w-5 rounded-sm" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    </SidebarMenuButton>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuAction showOnHover>
                                <Skeleton className="h-5 w-5 rounded-full" />
                            </SidebarMenuAction>
                        </DropdownMenuTrigger>
                    </DropdownMenu>
                </SidebarMenuItem>
            ))}
        </>
    )

    return (
        <SidebarGroup className="">
            <SidebarGroupLabel>Collections</SidebarGroupLabel>
            <CreateBoxModal>
                <SidebarGroupAction title="Add Project">
                    <Plus />
                    <span className="sr-only">Add Collection</span>
                </SidebarGroupAction>
            </CreateBoxModal>
            <SidebarMenu>
                {isLoading ? (
                    <SkeletonItems />
                ) : (
                    boxes?.map((item) => (
                        <SidebarMenuItem key={item.id} className="">
                            <SidebarMenuButton asChild>
                                <a href={`/box/${item.id}`}>
                                    <Folder
                                        style={{
                                            color: item.color ? `#${item.color.toString(16).padStart(6, "0")}` : "black"
                                        }}
                                        className={
                                            "font-extrabold"
                                        }
                                    />
                                    <span>{item.name}</span>
                                </a>
                            </SidebarMenuButton>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuAction showOnHover>
                                        <MoreHorizontal />
                                        <span className="sr-only">More</span>
                                    </SidebarMenuAction>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-48 rounded-lg"
                                    side={isMobile ? "bottom" : "right"}
                                    align={isMobile ? "end" : "start"}
                                >
                                    <DropdownMenuItem>
                                        <Folder className="text-muted-foreground" />
                                        <span>View Box</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Forward className="text-muted-foreground" />
                                        <span>Share Box</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Forward className="text-muted-foreground" />
                                        <span>Make public</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Trash2 className="text-muted-foreground" />
                                        <span>Delete Box</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    ))
                )}
            </SidebarMenu>
        </SidebarGroup>
    )
}

