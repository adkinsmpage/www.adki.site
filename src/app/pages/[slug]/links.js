function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function (props) {
    const { links, postContent } = props

    return (
        <>
            <div
                className='markdown-body text-base leading-7 text-gray-700 dark:text-slate-300 px-0'
                dangerouslySetInnerHTML={{
                    __html: String(postContent),
                }}
            ></div>
            <div className='links mx-auto'>
                <div className='divide-y divide-gray-200 overflow-hidden rounded-lg shadow-sm sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0'>
                    {links.map((link, i) => (
                        <a href={link.link} className='focus:outline-hidden'>
                            <div
                                key={i}
                                className={classNames(
                                    i === 0
                                        ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none'
                                        : '',
                                    i === 1 ? 'sm:rounded-tr-lg' : '',
                                    i === links.length - 2
                                        ? 'sm:rounded-bl-lg'
                                        : '',
                                    i === links.length - 1
                                        ? 'rounded-br-lg rounded-bl-lg sm:rounded-bl-none'
                                        : '',
                                    'group relative p-6 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-inset',
                                )}
                            >
                                <div>
                                    <img
                                        alt={link.title}
                                        loading='lazy'
                                        width='100'
                                        height='100'
                                        decoding='async'
                                        data-nimg='1'
                                        className='hover:rotate-[360deg] rounded-full'
                                        src={link.img}
                                    />
                                </div>
                                <div className='mt-8'>
                                    <h3 className='text-base font-semibold text-gray-900'>
                                        {link.title}
                                    </h3>
                                    <p className='mt-2 text-sm text-gray-500'>
                                        {link.description}
                                    </p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </>
    )
}
