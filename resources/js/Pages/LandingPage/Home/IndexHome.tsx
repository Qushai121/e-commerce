import React from 'react'
import { BigetronMain } from './sections/BigetronMain'
import NavbarMain from '@/Components/LandingPage/NavbarMain'
import TopBar from './sections/TopBar'
import Guest from '@/Layouts/GuestLayout'
import Category from './sections/Category'
import Products from './sections/Products'
import { Product } from '@/model/Product'

type IndexHomeProps = {
    products: Pick<Product, 'id' | 'product_name' | 'price' | 'discount' | 'image'>[],
}

const IndexHome: React.FC<IndexHomeProps> = ({ products }) => {
    return (
        <Guest>
            {/* <div className='flex justify-center ' >
                <div className='w-[60%]' > */}
                    <BigetronMain />
                    <Category />
                    <Products products={products} />
                {/* </div>
            </div> */}
        </Guest>
    )
}

export default IndexHome