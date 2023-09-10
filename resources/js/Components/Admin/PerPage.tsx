import React from 'react'
import WrapperShadow from '../WrapperShadow'
import { router } from '@inertiajs/react'

const PerPage = () => {

    function handleOnChange(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault()
        router.get(route(route().current() as string), {
            perPage: e.target.value 
        }, {
            preserveState: true,
            preserveScroll: true,
        })
    }

    return (
        <WrapperShadow className='flex items-center gap-2'>
            <p className='whitespace-nowrap font-light text-base_secondary ' >Data Per Page : </p>
            <select onChange={handleOnChange} className="select select-bordered w-full max-w-xs">
                <option value={10} selected>10</option>
                <option value={25} >25</option>
                <option value={50} >50</option>
                <option value={75} >75</option>
                <option value={100} >100</option>
            </select>
        </WrapperShadow>
    )
}

export default PerPage