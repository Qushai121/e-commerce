import TitleMain from '@/Components/LandingPage/TitleMain'
import Guest from '@/Layouts/GuestLayout'
import { router } from '@inertiajs/react'
import React, { SyntheticEvent } from 'react'

const IndexShopOwner = () => {

    function handleSubmit(e: SyntheticEvent) {
        router.post(route('become_shop_owner.store'))
    }
    return (
        <Guest>
            <TitleMain>
                How To Start Selling
            </TitleMain>
            <p>Firts You need become shop owner </p>
            <p>how to become shop owner ?</p>
            <p>you need to be sign up first and then click this shit up</p>
            <button onClick={handleSubmit} className='btn bg-green-400 text-white' >Become Shop Owner</button>
        </Guest>
    )
}

export default IndexShopOwner