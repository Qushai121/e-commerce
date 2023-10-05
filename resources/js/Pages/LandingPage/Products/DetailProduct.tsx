import ButtonMain from '@/Components/LandingPage/ButtonMain'
import QuantityInput from '@/Components/LandingPage/QuantityInput'
import Guest from '@/Layouts/GuestLayout'
import { Product } from '@/model/Product'
import { PageProps } from '@/types'
import { router, usePage } from '@inertiajs/react'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import AddCartProduct from './AddCartProduct'
import { BrowserView, MobileView, isMobile } from 'react-device-detect'
import LinkMain from '@/Components/LandingPage/LinkMain'
import { BsChatLeftText } from 'react-icons/bs'
import ChattingRoomMaker from '@/Pages/Chatting/ChattingRoomMaker'

type DetailProductProps = {
    product: Product & {
        store: {
            id: number,
            user_id: number,
        }
    }
}

const DetailProduct: React.FC<DetailProductProps> = ({ product }) => {

    const [checkOutMobile, setCheckOutMobile] = useState(false)
    // DOM VIEW


    const [processing, setProcessing] = useState<boolean>(false)

    const { auth } = usePage<PageProps>().props
    const [inputValue, setInputValue] = useState<number>(1);
    const [stockMsg, setStockMsg] = useState<string>()
    console.log(product);

    function handlePay() {

        if (isNaN(inputValue) || !auth.user) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Make account first',
            })
        }

        router.post(route('product.transaction.pay', product.id), {
            'quantity': inputValue,
        }, {
            onProgress: () => {
                setProcessing(true)
            },
            onSuccess: () => {
                setProcessing(false)
            }
        })
    }




    return (
        <>
            <Guest>
                <div className='xl:mt-0 mt-9 -mx-5 relative ' >
                    <div className='flex flex-col justify-between h-full xl:flex-row' >
                        <div className='xl:w-[30%] xl:sticky top-44 h-full xl:px-6 -mx-1'>
                            <div>
                                <img src={'/storage/' + product.image} alt="" />
                            </div>
                        </div>
                        <div className='flex-1 py-2 -mx-1 xl:px-4 border-x-2 h-screen bg-red- ' >
                            <h1 className='text-xl font-semibold'>{product.product_name}</h1>
                            <p>{product.price}</p>
                        </div>

                        <BrowserView className='xl:w-[22%] xl:sticky top-44 h-full px-6 '>
                            <div className=' h-72  border-2 border-opacity-50 border-base_four rounded-lg' >
                                <div className='flex flex-col  w-full' >
                                    <>
                                        <h1 className='text-lg font-bold text-center' >CheckOut</h1>
                                        <QuantityInput product={product} inputValue={inputValue} setInputValue={setInputValue} setStockMsg={setStockMsg} stockMsg={stockMsg} />
                                    </>
                                    <div className='mx-6 ' >
                                        <div className='flex justify-between'>
                                            <p>SubTotal :</p>
                                            {
                                                isNaN(inputValue) || product.stock == 0 ?
                                                    <p>$ 0</p>
                                                    :
                                                    <p>$ {product.price * inputValue - product.discount * inputValue}</p>
                                            }
                                        </div>
                                        <div className='flex flex-col gap-3 mt-6' >
                                            <AddCartProduct product={product} quantity={inputValue} />
                                            <div className='w-full flex justify-center ' >
                                                <ButtonMain disabled={isNaN(inputValue) || processing} onClick={handlePay} variant='no_border' >
                                                    Pay
                                                </ButtonMain>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='mx-10 py-2' >
                                <ChattingRoomMaker shopOwnerId={product.store.user_id} />
                            </div>
                        </BrowserView>


                    </div>
                    <div className='h-screen border-y-8 my-5 border-base_four '>
                        Nanti Ada ulasan
                    </div>
                    <MobileView className='py-3 px-2 fixed bottom-1 z-[999999] w-screen bg-stone-200 rounded-xl '>
                        <div className={`${checkOutMobile ? '-translate-y-1 ' : 'translate-y-36 h-0 opacity-0 '}  duration-300 `} >
                            <div className=' h-72  border-2 border-opacity-50 border-base_four rounded-lg' >
                                <div className='flex flex-col  w-full' >
                                    <>
                                        <h1 className='text-lg font-bold text-center' >CheckOut</h1>
                                        <QuantityInput product={product} inputValue={inputValue} setInputValue={setInputValue} setStockMsg={setStockMsg} stockMsg={stockMsg} />
                                    </>
                                    <div className='mx-6 ' >
                                        <div className='flex justify-between'>
                                            <p>SubTotal :</p>
                                            {
                                                isNaN(inputValue) || product.stock == 0 ?
                                                    <p>$ 0</p>
                                                    :
                                                    <p>$ {product.price * inputValue - product.discount * inputValue}</p>
                                            }
                                        </div>
                                        <div className='flex flex-col gap-3 mt-6' >
                                            <AddCartProduct product={product} quantity={inputValue} />
                                            <div className='w-full flex justify-center ' >
                                                <ButtonMain disabled={isNaN(inputValue) || processing} onClick={handlePay} variant='no_border' >
                                                    Pay
                                                </ButtonMain>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-6' >
                            <div className='w-32' >
                                <ChattingRoomMaker shopOwnerId={product.store.user_id} />
                            </div>
                            <ButtonMain onClick={() => setCheckOutMobile(!checkOutMobile)}>Add To Cart</ButtonMain>
                            <ButtonMain onClick={() => setCheckOutMobile(!checkOutMobile)} variant='no_border'>Buy</ButtonMain>
                        </div>
                    </MobileView>
                </div>
            </Guest >
        </>
    )
}

export default DetailProduct