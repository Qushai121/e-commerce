import { Product } from '@/model/Product'
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import InputError from '../InputError'

type QuantityInputProps = {
    product: Pick<Product,'stock'>,
    inputValue: number,
    setStockMsg: any,
    setInputValue: any,
    stockMsg?: string
}

const QuantityInput: React.FC<QuantityInputProps> = ({ product, inputValue, setInputValue, setStockMsg, stockMsg }) => {


    function handleAddInputValue(e: SyntheticEvent) {
        if (product.stock > inputValue) {
            setStockMsg('')
            return setInputValue((prev: number) => prev += 1)
        }
        if (isNaN(inputValue) || inputValue == 0) {
            setInputValue(1)
        };
        return setStockMsg(`Only ${product.stock} left in stock`)
    }

    function handleDecInputValue(e: SyntheticEvent) {
        if (inputValue >= 0) {
            setStockMsg('')
            setInputValue((prev: number) => prev -= 1)
        }

    }

    function handleChangeValue(e: ChangeEvent<HTMLInputElement>) {
        return setInputValue(e.target.valueAsNumber)
    }

    useEffect(() => {
        if (inputValue > product.stock) {
            setInputValue(product.stock)
            return setStockMsg(`Only ${product.stock} left in stock`)
        }

        // if(inputValue == 0){
        //     setInputValue(1);
        // }

    }, [inputValue])
    return (
        <>
            <div className='flex items-center gap-4 justify-center'>
                <div className='w-[50%] flex border-2 border-green-500 rounded-xl justify-center ' >
                    <button disabled={inputValue <= 1} onClick={handleDecInputValue} className='disabled:text-stone-300 text-xl w-full hover:bg-green-200 active:bg-green-300 font-bold rounded-l-xl'>-</button>
                    <input type="number" placeholder="" value={inputValue} onChange={handleChangeValue} className="w-14 input border-none text-center" />
                    <button disabled={inputValue >= product.stock} onClick={handleAddInputValue} className='disabled:text-stone-300 text-xl w-full hover:bg-green-200 active:bg-green-300 font-bold rounded-r-xl '>+</button>
                </div>
                <p>Stock : {product.stock}</p>
            </div>
            <InputError message={stockMsg} />
        </>
    )
}

export default QuantityInput