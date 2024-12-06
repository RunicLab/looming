import { MaxWidthWrapper } from '@/components/custom/max-width-wrapper'
import { Heading } from '@/components/primitives/Heading'
import ShinyButton from '@/components/primitives/ShinyButton'
import { Check } from 'lucide-react'
import React from 'react'
export default async function Home() {
    return (
        <section className='relative py-32 sm:py-24 bg-brand-25'>
            <MaxWidthWrapper className='text-center'>
                <div className='relative mx-auto text-center flex flex-col items-center gap-10'>
                    <div>
                        <Heading>
                            <span>Share your favourite bookmarks</span>
                            <br />
                            <span className='relative bg-gradient-to-r  from-brand-700 to-brand-800 text-transparent bg-clip-text'>
                                Organize, Explore, and Rediscover Your Favorite Links!
                            </span>
                        </Heading>
                    </div>
                    <p className='text-base/7 text-gray-600 max-w-prose text-center text-pretty'>
                        Ping Pong is the easiest way to monitor your SaaS, Get instant notifications for {" "}
                        <span className='font-semibold text-gray-700 '>sales, new users, or any other event</span>{" "}
                        sent directly to your favorite platforms
                    </p>
                    <ul className='space-y-2 text-base/7 text-gray-600 text-left flex flex-col items-start'>
                        {[
                            "Real-time Platform alerts for critical events",
                            "Built-in analytics and reporting",
                            "User-friendly interface",
                        ].map((item, index) => (
                            <li key={index} className='flex gap-1.5 items-center text-left' > <Check className='size-5 shrink-0 text-brand-700' /> {item}</li>
                        ))}
                    </ul>
                    <div className='w-full max-w-80'>
                        <ShinyButton href='/sign-up' className='relative z-10 h-14 w-[14rem] text-base shadow-lg transition-shadow duration-300 hover:shadow-xl'>
                            Get Started
                        </ShinyButton>
                    </div>
                </div>
            </MaxWidthWrapper>
        </section>

    )
}
