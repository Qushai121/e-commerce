import ButtonMain from '@/Components/LandingPage/ButtonMain'
import { Product } from '@/model/Product'
import { router, useForm } from '@inertiajs/react'
import React, { SyntheticEvent } from 'react'

type DeleteCartProductProps = {
    id: number
}
const DeleteCartProduct: React.FC<DeleteCartProductProps> = ({ id }) => {
    const { data, setData, delete: destroy, processing } = useForm()

    function handleSubmit(e: SyntheticEvent) {

        destroy(route('cart_product.destroy', id))
    }
    return (
        <ButtonMain variant='no_border' className='px-4' onClick={handleSubmit} >Delete</ButtonMain>

    )
}

export default DeleteCartProduct