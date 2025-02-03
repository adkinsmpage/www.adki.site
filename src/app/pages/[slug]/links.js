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
                <div className='overflow-hidden rounded-lg shadow-sm sm:grid sm:grid-cols-2'>
                    {links.map((link, i) => (
                        <a
                            key={i}
                            target='_blank'
                            href={link.link}
                            className='group focus:outline-hidden hover:opacity-75'
                        >
                            <div
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
                                        className='group-hover:rotate-[360deg] group-hover:saturate-150 group-hover:contrast-125 group-hover:scale-[1.4] rounded-full'
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
