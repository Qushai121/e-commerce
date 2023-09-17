import QuantityInput from '@/Components/LandingPage/QuantityInput'
import { Product } from '@/model/Product'
import { router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'

type cartProductProps = {
  cartProduct: (Pick<Product, 'id' | 'product_name' | 'price' | 'image' | 'discount' | 'store_id' | 'stock'> & {
    quantity: number,
    total_price:number
  });
}

const EditCartProduct: React.FC<cartProductProps> = ({ cartProduct }) => {


  const [inputValue, setInputValue] = useState<number>(cartProduct.quantity);
  const [stockMsg, setStockMsg] = useState<string>()

  useEffect(() => {
    if (inputValue !== cartProduct.quantity) {
      // gunnaya di timeout itu biar ga beratin server 
      // karena ini akan berjalan ketika user stop ngeinput data
      setTimeout(() => {
        router.post(route('cart_product.update', cartProduct.id), {
          _method: "put",
          quantity: inputValue > cartProduct.stock ? cartProduct.stock : inputValue
        })
      }, 100);
    }

  }, [inputValue])

  return (
    <>
      <QuantityInput inputValue={inputValue} product={cartProduct} setInputValue={setInputValue} setStockMsg={setStockMsg} stockMsg={stockMsg} />
    </>
  )
}

export default EditCartProduct