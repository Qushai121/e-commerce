import TextArea from '@/Components/Forms/TextArea'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import WrapperShadow from '@/Components/WrapperShadow'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { PageProps } from '@/types'
import { useForm, usePage } from '@inertiajs/react'
import React, { FormEvent, useEffect, useState } from 'react'
import LinkAdmin from '@/Components/Admin/LinkAdmin'
import Swal from 'sweetalert2'
import BlockedChooseStore from '@/Components/blockedSection/BlockedChooseStore'
import Blocked from '@/Components/blockedSection/Blocked'

const AddProduct = () => {
    const { mystores } = usePage<PageProps>().props

    const [haveStoreData] = useState<boolean>(mystores.stores.length > 0)
    // console.log(haveStoreData);

    const { data, setData, post, errors, wasSuccessful, reset, processing } = useForm({
        product_name: '',
        description: '',
        category: '',
        image: Blob,
        price: 0,
        discount: '',
        release_date: '',
        stock: 0
    })

    const [previewImage, setPreviewImage] = useState<string>()

    function handleImage(params: React.ChangeEvent<HTMLInputElement>) {
        if (params.target.files && params.target.files[0]) {
            const data = URL.createObjectURL(params.target.files[0]);
            setPreviewImage(data);
            setData('image', params.target.files[0])
        }
    }


    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        if (!mystores.chosenStore) {
            e.preventDefault();
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Choose Your Store First ngeyel banget kont..',
            })
        } else {
            e.preventDefault();
            post(route("product.store"), {
                onSuccess: (e) => {
                    console.log(e);
                    reset('stock', 'category', 'description', 'discount', 'image', 'price', 'product_name', 'release_date');
                }
            })

        }

    }

    return (
        <>
            <DashboardLayout>
                <WrapperShadow className='min-h-[75vh] h-[75vh] relative'>
                    {
                        !haveStoreData ?
                            <Blocked message='Make Your First Store' >
                                <LinkAdmin href={route('store.create')} className='animate-pulse' >{'Make Store'}</LinkAdmin>
                            </Blocked>
                            :
                            null
                    }
                    {
                        !mystores.chosenStore && haveStoreData ?
                            <div>
                                <BlockedChooseStore />
                            </div>
                            :
                            <form onSubmit={handleSubmit} >
                                <div className='flex flex-col gap-4 items-center ' >
                                    <div className='w-fit flex flex-col gap-3'>
                                        <div className='my-4 p-2 rounded-lg bg-base_secondary bg-opacity-25' >
                                            <h1 className='text-xl font-semibold text-center' >Add Product</h1>
                                        </div>
                                        <div className='flex flex-col xl:flex-row mx-auto' >
                                            <div className='xl:w-[25vw] flex flex-col gap-3'>
                                                <div className='flex flex-col mx-4 items-start' >
                                                    <InputLabel htmlFor="product_name" className=' font-medium ' >Product Name</InputLabel>
                                                    <TextInput disabled={!mystores.chosenStore} autoComplete='product_name' isFocused={true} type="text" onChange={(e) => setData("product_name", e.target.value)} placeholder="Type here" id='product_name' />
                                                    <InputError message={errors.product_name} />
                                                </div>
                                                <div className='flex flex-col mx-4 items-start' >
                                                    <InputLabel htmlFor="description" className=' font-medium ' >Description</InputLabel>
                                                    <TextArea disabled={!mystores.chosenStore} className='h-48' autoComplete='description' onChange={(e) => setData("description", e.target.value)} placeholder="Type here" id='description' />
                                                    <InputError message={errors.description} />
                                                </div>
                                                <div className='flex flex-col mx-4 items-start' >
                                                    <InputLabel htmlFor="release_date" className=' font-medium ' >Release Date</InputLabel>
                                                    <TextInput disabled={!mystores.chosenStore} type="date" onChange={(e) => setData("release_date", e.target.value)} placeholder="Type here" id='release_date' />
                                                    <InputError message={errors.release_date} />
                                                </div>
                                                <div className='flex flex-col mx-4 items-start' >
                                                    <InputLabel htmlFor="image" className=' font-medium ' >Image</InputLabel>
                                                    <input disabled={!mystores.chosenStore} type="file" id='image' onChange={handleImage} className="file-input file-input-bordered w-full max-w-xs" />
                                                    <InputError message={errors.image} />
                                                </div>
                                                {
                                                    true ?
                                                        <div className='w-[40vw]' >
                                                            <img src={previewImage} alt="" />
                                                        </div>
                                                        : null
                                                }
                                            </div>
                                            <div className='xl:w-[25vw] flex flex-col gap-3'>
                                                <div className='flex flex-col mx-4 items-start' >
                                                    <InputLabel htmlFor="category" className=' font-medium ' >Category</InputLabel>
                                                    <TextArea disabled={!mystores.chosenStore} className='h-48' autoComplete='category' onChange={(e) => setData("category", e.target.value)} placeholder="Type here" id='category' />
                                                    <InputError message={errors.category} />
                                                </div>

                                                <div className='flex flex-col mx-4 items-start' >
                                                    <InputLabel htmlFor="price" className=' font-medium ' >Price</InputLabel>
                                                    <TextInput disabled={!mystores.chosenStore} type="number" autoComplete='price' onChange={(e) => setData("price", Number(e.target.value))} placeholder="Type here" id='price' />
                                                    <InputError message={errors.price} />
                                                </div>
                                                <div className='flex flex-col mx-4 items-start' >
                                                    <InputLabel htmlFor="stock" className=' font-medium ' >Stock</InputLabel>
                                                    <TextInput disabled={!mystores.chosenStore} type="number" autoComplete='stock' onChange={(e) => setData("stock", Number(e.target.value))} placeholder="Type here" id='stock' />
                                                    <InputError message={errors.stock} />
                                                </div>
                                                <div className='flex flex-col mx-4 items-start' >
                                                    <InputLabel htmlFor="discount" className=' font-medium ' >Discount</InputLabel>
                                                    <TextInput disabled={!mystores.chosenStore} type="number" autoComplete='discount' onChange={(e) => setData("discount", e.target.value)} placeholder="Type here" id='discount' />
                                                    <InputError message={errors.discount} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='mb-5 flex justify-end gap-4'>
                                            <div >
                                                <PrimaryButton type='submit' disabled={processing} className='py-4 px-6 !bg-blue-400' >Add Product</PrimaryButton>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                    }
                </WrapperShadow>
            </DashboardLayout>
        </>
    )
}

export default AddProduct;