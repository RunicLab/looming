"use client"

import { useQuery } from '@tanstack/react-query'
import { CheckCircleIcon, Loader, LucideProps } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { client } from "@/lib/client"
import { debounce } from 'lodash';
import { Button } from '@/components/ui/button'

export default function page() {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [available, setAvailable] = useState<boolean | null>(null);
    const [username, setUsername] = useState<string>("")

    const { data, isLoading } = useQuery({
        queryFn: async () => {
            const res = await client.user.getUser.$get()
            return await res.json()
        },
        queryKey: ["get-user-data"],
    })

    useEffect(() => {
        if (data && data.username) {
            router.push('/dashboard')
        }
    }, [data])


    const debouncedCheckUsername = debounce(async (username: string) => {
        try {
            setLoading(true);
            if (username.length == 0) {
                setLoading(false);
                setAvailable(null);
                setUsernameError('');
                return;
            }
            if (username.length < 3) {
                setLoading(false);
                setAvailable(false);
                setUsernameError('Username must be at least 3 characters long');
                return;
            }
            const response = await client.user.checkIfUsernameExists.$get({ username });
            const data = await response.json();
            if (!data.exists) {
                setAvailable(true);
                setUsernameError('');
            } else {
                setAvailable(false);
            }
        } catch (error) {
            setUsernameError('Error checking username');
        } finally {
            setLoading(false);
        }
    }, 500);

    const updateUserName = async () => {
        try {
            setLoading(true);
            if (!username) {
                throw new Error('Username is required');
            }
            const response = await client.user.updateUsername.$post({ username });
            const data = await response.json();
            if (data.username) {
                router.push('/dashboard');
            }
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }


    if (data && data.username) {
        return (
            <div>
                <h1>Welcome, {data.username}!</h1>
                <button onClick={() => router.push('/dashboard')}>Dashboard</button>
            </div>
        )
    }

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setUsername(inputValue);
        debouncedCheckUsername(inputValue);
    };

    return (
        <div className="w-full flex flex-col flex-1 items-center justify-center relative">
            <section className="flex-col flex gap-1.5 lg:gap-3 p-3 lg:p-4 w-5/6 md:w-2/3 lg:w-1/3  mx-auto">
                <p className="text-lg lg:text-2xl/none -tracking-wider font-bold">Choose a username for your page</p>
                <p className="text-sm font-normal">add a unique username.</p>

                <div
                    className={`gap-0.5 flex items-center w-full border-2 ${available === true ? 'border-green-700' : available === false ? 'border-red-700' : 'border-black'
                        } rounded-lg p-2.5 bg-gray-100`}
                >
                    <p className="font-semibold text-sm lg:text-base">loomi.ng/</p>

                    <input
                        onChange={handleUsernameChange}
                        value={username}
                        type="text"
                        className="flex-1 bg-transparent focus:border-none outline-none "
                    />

                    {loading ? (
                        <div className={''}>
                            <Loader className="animate-spin" />
                        </div>
                    ) : null}
                    {available ? (
                        <div className={''}>
                            <CheckCircleIcon color="green" />
                        </div>
                    ) : null}
                </div>
                {usernameError && <p className="text-red-500 font-semibold text-sm">{usernameError}</p>}
                <div className="flex gap-3">
                    <Button onClick={updateUserName} disabled={loading || isLoading || !available || !username} className="px-4 lg:px-8 text-sm lg:text-base">
                        Save username
                    </Button>
                </div>
            </section>

        </div>
    )
}

















































const BackgroundPattern = (props: LucideProps) => {
    return (
        <svg
            width="768"
            height="736"
            viewBox="0 0 768 736"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={props.className}
        >
            <mask
                id="mask0_5036_374506"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="-32"
                width="768"
                height="768"
            >
                <rect
                    width="768"
                    height="768"
                    transform="translate(0 -32)"
                    fill="url(#paint0_radial_5036_374506)"
                />
            </mask>
            <g mask="url(#mask0_5036_374506)">
                <g clipPath="url(#clip0_5036_374506)">
                    <g clipPath="url(#clip1_5036_374506)">
                        <line x1="0.5" y1="-32" x2="0.5" y2="736" stroke="#E4E7EC" />
                        <line x1="48.5" y1="-32" x2="48.5" y2="736" stroke="#E4E7EC" />
                        <line x1="96.5" y1="-32" x2="96.5" y2="736" stroke="#E4E7EC" />
                        <line x1="144.5" y1="-32" x2="144.5" y2="736" stroke="#E4E7EC" />
                        <line x1="192.5" y1="-32" x2="192.5" y2="736" stroke="#E4E7EC" />
                        <line x1="240.5" y1="-32" x2="240.5" y2="736" stroke="#E4E7EC" />
                        <line x1="288.5" y1="-32" x2="288.5" y2="736" stroke="#E4E7EC" />
                        <line x1="336.5" y1="-32" x2="336.5" y2="736" stroke="#E4E7EC" />
                        <line x1="384.5" y1="-32" x2="384.5" y2="736" stroke="#E4E7EC" />
                        <line x1="432.5" y1="-32" x2="432.5" y2="736" stroke="#E4E7EC" />
                        <line x1="480.5" y1="-32" x2="480.5" y2="736" stroke="#E4E7EC" />
                        <line x1="528.5" y1="-32" x2="528.5" y2="736" stroke="#E4E7EC" />
                        <line x1="576.5" y1="-32" x2="576.5" y2="736" stroke="#E4E7EC" />
                        <line x1="624.5" y1="-32" x2="624.5" y2="736" stroke="#E4E7EC" />
                        <line x1="672.5" y1="-32" x2="672.5" y2="736" stroke="#E4E7EC" />
                        <line x1="720.5" y1="-32" x2="720.5" y2="736" stroke="#E4E7EC" />
                    </g>
                    <rect x="0.5" y="-31.5" width="767" height="767" stroke="#E4E7EC" />
                    <g clipPath="url(#clip2_5036_374506)">
                        <line y1="15.5" x2="768" y2="15.5" stroke="#E4E7EC" />
                        <line y1="63.5" x2="768" y2="63.5" stroke="#E4E7EC" />
                        <line y1="111.5" x2="768" y2="111.5" stroke="#E4E7EC" />
                        <line y1="159.5" x2="768" y2="159.5" stroke="#E4E7EC" />
                        <line y1="207.5" x2="768" y2="207.5" stroke="#E4E7EC" />
                        <line y1="255.5" x2="768" y2="255.5" stroke="#E4E7EC" />
                        <line y1="303.5" x2="768" y2="303.5" stroke="#E4E7EC" />
                        <line y1="351.5" x2="768" y2="351.5" stroke="#E4E7EC" />
                        <line y1="399.5" x2="768" y2="399.5" stroke="#E4E7EC" />
                        <line y1="447.5" x2="768" y2="447.5" stroke="#E4E7EC" />
                        <line y1="495.5" x2="768" y2="495.5" stroke="#E4E7EC" />
                        <line y1="543.5" x2="768" y2="543.5" stroke="#E4E7EC" />
                        <line y1="591.5" x2="768" y2="591.5" stroke="#E4E7EC" />
                        <line y1="639.5" x2="768" y2="639.5" stroke="#E4E7EC" />
                        <line y1="687.5" x2="768" y2="687.5" stroke="#E4E7EC" />
                        <line y1="735.5" x2="768" y2="735.5" stroke="#E4E7EC" />
                    </g>
                    <rect x="0.5" y="-31.5" width="767" height="767" stroke="#E4E7EC" />
                </g>
            </g>
            <defs>
                <radialGradient
                    id="paint0_radial_5036_374506"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(384 384) rotate(90) scale(384 384)"
                >
                    <stop />
                    <stop offset="1" stopOpacity="0" />
                </radialGradient>
                <clipPath id="clip0_5036_374506">
                    <rect
                        width="768"
                        height="768"
                        fill="white"
                        transform="translate(0 -32)"
                    />
                </clipPath>
                <clipPath id="clip1_5036_374506">
                    <rect y="-32" width="768" height="768" fill="white" />
                </clipPath>
                <clipPath id="clip2_5036_374506">
                    <rect y="-32" width="768" height="768" fill="white" />
                </clipPath>
            </defs>
        </svg>
    )
}
