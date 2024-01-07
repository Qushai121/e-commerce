import ButtonMain from '@/Components/LandingPage/ButtonMain'
import QuantityInput from '@/Components/LandingPage/QuantityInput'
import Guest from '@/Layouts/GuestLayout'
import ChattingRoomMaker from '@/Pages/Chatting/ChattingRoomMaker'
import { Product } from '@/model/Product'
import { PageProps } from '@/types'
import { router, usePage } from '@inertiajs/react'
import React, { useState } from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import { MdOutlineVerified } from "react-icons/md";
import AddCartProduct from './AddCartProduct'
import formatRupiah from '@/Helper/Rupiah_helper'
import LinkMain from '@/Components/LandingPage/LinkMain'
import { Helmet } from 'react-helmet';
import axios from 'axios'
type DetailProductProps = {
    product: Product & {
        store: {
            id: number,
            user_id: number,
            store_banner: string
            store_name: string
        }
    }
    midtransClientKey: string
}

const DetailProduct: React.FC<DetailProductProps> = ({ product, midtransClientKey }) => {


    const [checkOutMobile, setCheckOutMobile] = useState(false)
    const [processing, setProcessing] = useState<boolean>(false)

    const { auth } = usePage<PageProps>().props
    const [inputValue, setInputValue] = useState<number>(1);
    const [stockMsg, setStockMsg] = useState<string>()

    async function handlePay() {
        const res = await axios.post(route('snapToken'), {
            dataProduct: [
                {
                    quantity: inputValue,
                    productId: product.id
                }
            ],
        })
        window.snap.pay(res.data.snapToken);

    }
    

    return (
        <>
            <Helmet>
                <script
                    type="text/javascript"
                    src="https://app.sandbox.midtrans.com/snap/snap.js"
                    data-client-key={midtransClientKey}
                />
            </Helmet>
            <Guest>
                <div className='xl:mt-0 mt-9 -mx-5 relative ' >
                    <div className='flex flex-col justify-between h-full xl:flex-row' >
                        <div className='xl:w-[30%] xl:sticky top-44 h-full xl:px-6 -mx-1'>
                            <div className='flex justify-center'>
                                <img src={'/storage/' + product.image} alt="" />
                            </div>
                        </div>
                        <div className='flex-1 py-2 -mx-1 px-4 border-x-2  flex-col' >
                            <div className='min-h-[60vh]'>
                                <h1 className='text-xl font-semibold'>{product.product_name}</h1>
                                <p>{formatRupiah(product.price)}</p>
                                <div className='bg-red-400'>
                                    <p>{product.description}</p>
                                </div>
                            </div>
                            <div className='flex gap-2 xl:border-2 xl:p-4 xl:shadow-lg' >
                                <div className="avatar">
                                    <div className="w-20 rounded">
                                        <img src={'/storage/' + product.store.store_banner} alt="" />
                                    </div>
                                </div>
                                <div className='flex flex-col justify-between' >
                                    <p className='text-lg font-semibold flex gap-3 items-center' ><span>{product.store.store_name}</span> <MdOutlineVerified /></p>
                                    <LinkMain href='' variant='no_border' className='text-sm ' >More About This Store</LinkMain>
                                </div>
                            </div>
                        </div>

                        <BrowserView className='xl:w-[22%] xl:sticky top-44 h-full px-6 '>
                            <div className=' h-fit py-4 px-1 border-2 border-opacity-50 border-base_four rounded-lg' >
                                <div className='flex flex-col  w-full' >
                                    <>
                                        <h1 className='text-lg font-bold text-center' >CheckOut</h1>
                                        <QuantityInput product={product} inputValue={inputValue} setInputValue={setInputValue} setStockMsg={setStockMsg} stockMsg={stockMsg} />
                                    </>
                                    <div className='mx-6 mt-4' >

                                        {
                                            product.discount > 0 ? <>
                                                <div className='flex justify-between' >
                                                    <p>Before :</p>
                                                    <p>
                                                        {formatRupiah(product.price * inputValue)}
                                                    </p>
                                                </div>
                                                <div className='flex justify-between'>
                                                    <p>Discount : </p>
                                                    <p>
                                                        {formatRupiah(product.discount)}
                                                    </p>
                                                </div>
                                                <hr className='border-t-2 my-2 border-green-400' />
                                            </> : <></>
                                        }
                                        <div className='flex justify-between'>
                                            <p>Total :</p>
                                            {
                                                isNaN(inputValue) || product.stock == 0 ?
                                                    <p> {formatRupiah(0)}</p>
                                                    :
                                                    <div className='flex flex-col'>

                                                        <div>
                                                            <p>{formatRupiah(product.price * inputValue - product.discount * inputValue)}</p>
                                                        </div>
                                                    </div>

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
                            {
                                auth.user ?
                                    <>
                                        {
                                            product.store.user_id !== auth.user.id ?
                                                <div className='mx-10 py-2' >
                                                    <ChattingRoomMaker shopOwnerId={product.store.user_id} />
                                                </div>
                                                : null
                                        }
                                    </>
                                    : null
                            }
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
                                                    <p>{formatRupiah(0)}</p>
                                                    :
                                                    <p>{formatRupiah(product.price * inputValue - product.discount * inputValue)}</p>
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
                            {
                                auth.user ?
                                    <>
                                        {
                                            product.store.user_id !== auth.user.id ?
                                                <div className='w-32' >
                                                    <ChattingRoomMaker shopOwnerId={product.store.user_id} />
                                                </div>
                                                : null
                                        }
                                    </>
                                    : null
                            }
                            <ButtonMain onClick={() => setCheckOutMobile(!checkOutMobile)}>Add To Cart</ButtonMain>
                            <ButtonMain onClick={() => setCheckOutMobile(!checkOutMobile)} variant='no_border'>Buy</ButtonMain>
                        </div>
                    </MobileView>
                </div >
            </Guest >
        </>
    )
}

export default DetailProduct