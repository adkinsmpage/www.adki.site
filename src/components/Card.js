/*
 *
 * From [crash-homepage By Kotsuki Crrashh](https://github.com/crrashh1542/crash-homepage)
 * 
 * '/src/components/main/Card.astro'
 * 
 */ 

import './Card.css'

export default function({ children }) {
    return <div className='card rounded-lg px-5 py-3 my-2 mr-4 inline-block'>
        {children}
    </div>
}