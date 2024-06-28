'use client'

import Nav from './Nav'

export default function HeaderNav() {
    return (
        <div className="">
            <header className="z-40 fixed backdrop-blur-lg inset-x-0 top-0">
                <Nav />
            </header>
        </div>
    );
}
