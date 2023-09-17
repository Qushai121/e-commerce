import Guest from '@/Layouts/GuestLayout';
import { Product } from '@/model/Product'
import React, { MouseEvent } from 'react'
import DeleteCartProduct from './Cart/DeleteCartProduct';
import { router, usePage } from '@inertiajs/react';
import ButtonMain from '@/Components/LandingPage/ButtonMain';
import { PageProps } from '@/types';
import EditCartProduct from './Cart/EditCartProduct';

type ListCartProductProps = {
    cartProducts: (Pick<Product, 'id' | 'product_name' | 'price' | 'image' | 'discount' | 'store_id' | 'stock'> & {
        quantity: number,
        total_price: number,
    })[] | null;
    cartTotalPrice: number;
};

const ListCartProduct: React.FC<ListCartProductProps> = ({ cartProducts, cartTotalPrice }) => {


    const data = cartProducts?.map((data) => {
        return {
            product_id: data.id,
            quantity: data.quantity,
        }
    })

    // console.log(usePage<PageProps>().props.flash.message);


    function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
        router.post(route('product.cart.transaction.pay'), {
            ...data as any
        })
    }

    return (
        <Guest>
            {
                cartProducts ?
                    <>
                        {cartProducts.map((cartProduct, key) => (
                            <div key={key}>
                                <div className='flex gap-6' >
                                    <p>
                                        {cartProduct.product_name}
                                    </p>
                                </div>
                                <div className='flex gap-5' >
                                    <div className='w-40' >
                                        <img src={'storage/' + cartProduct.image} alt="" className='h-full p-2' />
                                    </div>
                                    <div>
                                        <p>
                                            Price:
                                            <span className='line-through text-stone-400' >
                                                {' '}${cartProduct.price}
                                            </span>
                                            <span>
                                                {' '}${cartProduct.price - cartProduct.discount}
                                            </span>
                                        </p>
                                        <p>
                                            Qty:
                                            <span>
                                                {' '}{cartProduct.quantity}
                                            </span>
                                        </p>
                                        <p>
                                            sub total : <span> ${cartProduct.total_price}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-12' >
                                    <div className='h-full' >
                                        <DeleteCartProduct id={cartProduct.id} />
                                    </div>
                                    <div className='w-48' >
                                        <EditCartProduct cartProduct={cartProduct} />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <p>
                            Total Price:
                            <span>
                                {' '}${cartTotalPrice}
                            </span>
                        </p>
                        <ButtonMain onClick={handleSubmit}>Pay All</ButtonMain>
                    </>
                    :
                    <>You Have No Product Added to your cart</>
            }
        </Guest>
    )
}



export default ListCartProduct