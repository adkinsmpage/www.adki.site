/*
 *
 * From [crash-homepage By Kotsuki Crrashh](https://github.com/crrashh1542/crash-homepage)
 *
 * '/src/components/main/Properties.astro'
 *
 */

import './Properties.css'

export default function Properties({ Properties }) {
    return (
        <div className='property-wrapper'>
            {Properties.map((item, i) => (
                <div
                    className='card rounded-lg px-5 py-3 my-2 mr-4 inline-block'
                    key={i}
                >
                    <div className='title text-lg flex'>
                        <span>{item.title}</span>
                        <span className='grow'></span>
                        <span className='value text-sm rounded-full text-white'>
                            {item.value}%
                        </span>
                    </div>

                    <div
                        className='status relative rounded-full w-full h-2 mt-2 mb-4'
                        data-tooltip={item.tip}
                    >
                        <div
                            className='progress absolute h-full rounded-full t-0 l-0'
                            style={{ width: `${item.value}%` }}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    )
}
