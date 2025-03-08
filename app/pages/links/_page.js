'use client'

import AnimatedBackground from '@/components/ui/animated-background';

export function AnimatedCardBackgroundHover({ items }) {
    return (
        <div className='grid grid-cols-1 p-10 md:grid-cols-2'>
            <AnimatedBackground
                className='rounded-lg bg-zinc-100 dark:bg-zinc-800 gap-5'
                transition={{
                    type: 'spring',
                    bounce: 0.2,
                    duration: 0.6,
                }}
                enableHover
            >
                {items.map((item, index) => (
                    <div className='group m-5 p-5' key={index} onClick={() => { window.open(item.link) }} data-id={`card-${index}`}>
                        <a
                            href={item.link}
                            className="w-full flex relative transition-all duration-300 overflow-hidden items-center gap-5 rounded-md outline-none"

                        >
                            <div className="h-20 w-20">
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="group-hover:animate-spin rounded-full object-cover h-full w-full" />
                            </div>
                            <div>
                                <div className="font-bold block">
                                    {item.title}
                                </div>
                                <p>
                                    {item.description}
                                </p>
                            </div>
                        </a>
                    </div>
                ))}
            </AnimatedBackground>
        </div>
    );
}
