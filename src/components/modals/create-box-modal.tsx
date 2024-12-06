"use client"

import { client } from '@/lib/client'
import { cn } from '@/lib/utils'
import { BOX_NAME_VALIDATOR } from '@/validators/box'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { PropsWithChildren, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Modal } from '../ui/modal'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'

interface Props extends PropsWithChildren {
    containerClassName?: string
}

const COLOR_OPTIONS = [
    "#FF6B6B", // bg-[#FF6B6B] ring-[#FF6B6B] Bright Red
    "#4ECDC4", // bg-[#4ECDC4] ring-[#4ECDC4] Teal
    "#45B7D1", // bg-[#45B7D1] ring-[#45B7D1] Sky Blue
    "#FFA07A", // bg-[#FFA07A] ring-[#FFA07A] Light Salmon
    "#98D8C8", // bg-[#98D8C8] ring-[#98D8C8] Seafoam Green
    "#FDCB6E", // bg-[#FDCB6E] ring-[#FDCB6E] Mustard Yellow
    "#6C5CE7", // bg-[#6C5CE7] ring-[#6C5CE7] Soft Purple
    "#FF85A2", // bg-[#FF85A2] ring-[#FF85A2] Pink
    "#2ECC71", // bg-[#2ECC71] ring-[#2ECC71] Emerald Green
    "#E17055", // bg-[#E17055] ring-[#E17055] Terracotta
]

export const BOX_CATEGORY_VALIDATOR = z.object({
    name: BOX_NAME_VALIDATOR,
    color: z.string().min(1, "Color is required.").regex(/^#[0-9A-F]{6}$/i, "Invalid color format."),
    description: z.string().optional()
})

type BoxCategoryForm = z.infer<typeof BOX_CATEGORY_VALIDATOR>

export default function CreateBoxModal({ containerClassName, children }: Props) {

    const [isOpen, setIsOpen] = useState(false)
    const queryClient = useQueryClient()

    const { isPending, mutate: createBox } = useMutation({
        mutationFn: async (box: BoxCategoryForm) => {
            // const response = await client.box.createbox.$post(box)
            // return await response.json()
        },
        onSuccess: () => {
            reset()
            queryClient.invalidateQueries({ queryKey: ["user-box"] })
            setIsOpen(false)
        },
    })

    const { reset, handleSubmit, formState: { errors }, watch, setValue, register } = useForm<BoxCategoryForm>({
        resolver: zodResolver(BOX_CATEGORY_VALIDATOR)
    })

    const color = watch("color")

    const onSubmit = async (data: BoxCategoryForm) => {
        console.log(data)
        createBox(data)
    }

    return (
        <>
            <div onClick={() => setIsOpen(true)} className={cn("", containerClassName)}>{children}</div>
            <Modal showModal={isOpen} setShowModal={setIsOpen} className='max-w-xl p-8'>
                <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                    <div className=''>
                        <h2 className='text-lg/7 font-medium tracking-light text-gray-950'>
                            New Bookmarks Box
                        </h2>
                        <p className='text-sm/6 text-gray-600'>
                            Create a new box to organze your bookmarks
                        </p>
                    </div>
                    <div className='space-y-5'>
                        <div>
                            <Label>Name</Label>
                            <Input autoFocus id='name' {...register("name")} placeholder='e.g. Tech news tweets' className='w-full' />
                            {errors.name ? (
                                <p className='mt-1 text-sm/6 text-red-500'>{errors.name.message}</p>
                            ) : null}
                        </div>
                        <div>
                            <Label>Color</Label>
                            <div className='flex flex-wrap gap-3'>
                                {COLOR_OPTIONS.map((premadeColor) => (
                                    <button key={premadeColor} type='button' className={cn(`bg-[${premadeColor}]`, "size-10 rounded-full ring-2 ring-offset-2 transition-all", color === premadeColor ? "ring-brand-700 scale-110 " : "ring-transparent hover:scale-105")}
                                        onClick={() => setValue("color", premadeColor)}
                                    ></button>
                                ))}
                            </div>
                            {errors.color ? (
                                <p className='mt-1 text-sm/6 text-red-500'>{errors.color.message}</p>
                            ) : null}
                        </div>

                        <div>
                            <Label className='mb-1'>Description</Label>
                            <div className="flex flex-wrap gap-3">
                                <Textarea
                                    id="description"
                                    {...register("description")}
                                    placeholder="Enter a description (optional)"
                                    className="w-full h-28 resize-none"
                                />
                            </div>

                            {errors.description ? (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.description.message}
                                </p>
                            ) : null}
                        </div>
                    </div>
                    <div className="flex justify-end space-x-3 pt-4 border-t">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button disabled={isPending} type="submit">
                            {isPending ? "Creating..." : "Create Box"}{" "}
                        </Button>
                    </div>
                </form>
            </Modal>

        </>
    )
}

