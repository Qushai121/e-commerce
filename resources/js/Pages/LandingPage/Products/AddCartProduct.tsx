import ButtonMain from '@/Components/LandingPage/ButtonMain'
import { Product } from '@/model/Product'
import { router, useForm } from '@inertiajs/react'
import React, { MouseEvent } from 'react'

type AddCartProductProps = {
    product: Product
    quantity: number
}
const AddCartProduct: React.FC<AddCartProductProps> = ({ product, quantity }) => {


    function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
        router.post(route('cart_product.store'), {
            quantity: quantity,
            product_id: product.id,
        })
    }
    return (
        <div>
            <ButtonMain onClick={handleSubmit} disabled={false} >
                + Add Cart
            </ButtonMain>
        </div>
    )
}

export default AddCartProduct