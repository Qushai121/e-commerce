import { Link } from '@inertiajs/react'
import React from 'react'

const TopBar = () => {
    return (
        <div className='bg-base_main bg-opacity-10 px-6 py-1' >
            <div className='flex gap-8 justify-end' >
                <Link href='' className='text-sm'>Botiga About</Link>
                <Link href='' className='text-sm'>Botiga Partners</Link>
                <Link href={route('become_shop_owner.index')} className='text-sm'>Start Selling</Link>
                <Link href='' className='text-sm'>Botiga Care</Link>
            </div>
        </div>
    )
}

export default TopBar