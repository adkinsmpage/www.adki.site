import '@/app/page.css'
import '@/assets/css/markdown.css'

export default async function Page({ children }) {
    return (
        <div className='mx-auto relative isolate overflow-hidden py-12 sm:py-12 lg:overflow-visible px-7 flex items-center flex-col'>
            <div>
                <div className='mb-8 w-full'>
                    <div>
                        <div className='text-base leading-7 text-gray-700 dark:text-slate-300 px-0'>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
