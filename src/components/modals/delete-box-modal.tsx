"use client"

import React, { PropsWithChildren, useEffect, useState } from 'react'
import { Modal } from '../ui/modal';
import { cn } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/client';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { usePathname, useRouter } from 'next/navigation';

interface Props extends PropsWithChildren {
    containerClassName?: string
    onOpen?: () => void
    boxId: string
}

export default function DeleteBoxModal({ children, containerClassName, onOpen, boxId }: Props) {

    const [isOpen, setIsOpen] = useState(false)
    const queryClient = useQueryClient()
    const route = useRouter()
    const pathname = usePathname()

    const { mutate: deleteCategory, isPending: isDeletingCategory } = useMutation({
        mutationFn: async (boxId: string) => {
            await client.box.deleteBox.$post({ boxId })
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["get-user-boxes"] })
            toast.success("Successfully deleted collection")
            if (pathname.includes(boxId)) {
                route.replace('/dashboard')
            }
            setIsOpen(false)
        },
    })

    const handleOpen = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent event from bubbling
        setIsOpen(true);
        onOpen?.();
    }

    const onDelete = () => {
        deleteCategory(boxId)
    }


    return (
        <>
            <div onClick={handleOpen} className={cn("cursor-pointer", containerClassName)}>{children}</div>
            <Modal showModal={isOpen} setShowModal={setIsOpen} className='max-w-xl p-8'>
                <div className="space-y-6" >
                    <div>
                        <h2 className="text-lg/7 font-medium tracking-tight text-gray-950">Delete Collection</h2>
                        <p className="text-sm/6 text-gray-600">
                            Are you sure you want to delete this collection? This action cannot be undone.
                        </p>
                    </div>
                    <div className="flex justify-end space-x-3 pt-4 border-t">
                        <Button variant={"ghost"} onClick={() => setIsOpen(false)} size={"sm"} className="text-gray-600 hover:text-red-600 transition-colors ">
                            Cancel
                        </Button>
                        <Button onClick={onDelete}
                            disabled={isDeletingCategory}
                            variant={"destructive"}
                        >
                            {isDeletingCategory ? "Deleting..." : "Delete"}
                        </Button>
                    </div>
                </div>

            </Modal>
        </>
    )
}
