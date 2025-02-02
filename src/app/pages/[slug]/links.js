export default function (props) {
    const { links, postContent } = props

    console.log(links)
    return (
        <div className='markdown-body text-base leading-7 text-gray-700 dark:text-slate-300 px-0'>
            <div className='links mx-auto'>
                <ul className='flex flex-wrap gap-5'>
                    {links.map((link, i) => (
                        <li
                            key={i}
                            className='transition-all border duration-300 rounded-2xl px-4 border-transparent hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_30px_60px_-15px_rgba(255,255,255,0.3)]'
                        >
                            <a
                                href={link.link}
                                target='_blank'
                                className='flex items-center gap-3'
                            >
                                <img
                                    alt={link.title}
                                    loading='lazy'
                                    width='100'
                                    height='100'
                                    decoding='async'
                                    data-nimg='1'
                                    className='hover:rotate-[360deg] inline-block w-8 rounded-full'
                                    src={link.img}
                                />
                                <span className='font-bold'>{link.title}</span>
                                <span>|</span>
                                <span className='font-bold'>
                                    {link.description}
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div
                className='text-base leading-7 text-gray-700 dark:text-slate-300 px-0'
                dangerouslySetInnerHTML={{
                    __html: String(postContent),
                }}
            ></div>
        </div>
    )
}
