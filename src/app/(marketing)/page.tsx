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
                            <span>Curate Your Digital Library</span>
                            <br />
                            <span className='relative bg-gradient-to-r  from-brand-700 to-brand-800 text-transparent bg-clip-text'>
                                Bookmark Brilliance, Organized & Shared
                            </span>
                        </Heading>
                    </div>
                    <p className='text-base/7 text-gray-600 max-w-prose text-center text-pretty'>
                        Transform how you collect, organize, and share your favorite web discoveries.
                        Create meaningful collections and never lose that {" "}
                        <span className='font-semibold inline-flex text-gray-700'> perfect link again</span>
                    </p>
                    <ul className='space-y-2 text-base/7 text-gray-600 text-left flexx flex-col items-start hidden'>
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
