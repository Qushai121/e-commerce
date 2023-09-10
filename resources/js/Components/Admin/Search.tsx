import React from 'react'
import WrapperShadow from '../WrapperShadow'
import { router } from '@inertiajs/react'

type SearchProps = {
    className?: string
}

const Search: React.FC<SearchProps> = ({ className }) => {


    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
       setTimeout(() => {
            router.get(route(route().current() as string), {
                search: e.target.value
            }, {
                preserveState: true,
                preserveScroll: true,
            })
        }, 300)
    }
    return (
        <WrapperShadow className={`flex items-center ${className} `}>
            <div className="form-control">
                <div className="input-group flex items-center ">
                    <input onChange={handleOnChange} type="text" placeholder="Search…" className="input input-bordered text-base_secondary bg-stone-50" />
                    <button className="btn btn-square">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                </div>
            </div>
        </WrapperShadow>
    )
}

export default Search