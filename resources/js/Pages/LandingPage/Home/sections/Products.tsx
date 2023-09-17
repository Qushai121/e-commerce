import { Product } from '@/model/Product'
import { Link } from '@inertiajs/react';
import React from 'react'

type ProductsProps = {
    products: Pick<Product, 'id' | 'product_name' | 'price' | 'discount' | 'image'>[],
}

const Products: React.FC<ProductsProps> = ({ products }) => {
    console.log(products);

    return (
        <div className=''>
            <div className='flex gap-6 bg-red-400'>
                {products.map((product, key) => (
                    <Link href={route('product.detail', product.id)} className="card w-60 bg-base-100 shadow-xl">
                        <figure><img src={'/storage/' + product.image} alt="Shoes" /></figure>
                        <div className="card-body gap-0 py-1 px-2">
                            <h2 className="text-sm">
                                {product.product_name}
                            </h2>
                            <p className='font-bold my-1' >$ {product.price}</p>
                            <div className='flex flex-col gap-1' >
                                <p className='font-medium text-sm bg-green-600 w-fit px-1 rounded-md text-white'>
                                    discounts
                                </p>
                                <div className='flex gap-1'>
                                    <img src="/icons/location.svg" alt="" />
                                    <p className='text-sm' >
                                        location
                                    </p>
                                </div>
                                <p className='text-sm' >
                                    3k+ sold
                                </p>
                            </div>
                        </div>
                    </Link>
                ))
                }
            </div>
        </div>
    )
}

export default Products