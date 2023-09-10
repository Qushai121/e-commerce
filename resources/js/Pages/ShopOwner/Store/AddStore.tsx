import TextArea from '@/Components/Forms/TextArea'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import WrapperShadow from '@/Components/WrapperShadow'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { useForm } from '@inertiajs/react'
import React, { FormEvent, useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const AddStore = () => {

    const { data, setData, post, errors, wasSuccessful, reset, processing } = useForm({
        store_name: '',
        store_description: '',
        store_banner: Blob,
    })

    const [previewStoreBanner, setPreviewStoreBanner] = useState<string>()

    function handleStoreBanner(params: React.ChangeEvent<HTMLInputElement>) {
        if (params.target.files && params.target.files[0]) {
            const data = URL.createObjectURL(params.target.files[0]);
            setPreviewStoreBanner(data);
            setData('store_banner', params.target.files[0])
        }
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(route("store.store"), {
            onSuccess: (e: any) => {
                console.log(e);
                Swal.fire({
                    icon: 'success',
                    text: e.props.flash.success,
                    confirmButtonColor: "#3085d6",
                })
            }
        })
    }

    useEffect(() => {
        return () => {
            reset('store_description', 'store_banner', 'store_name');
        };
    }, []);

    return (
        <DashboardLayout>
            <WrapperShadow className='min-h-[75vh]'>
                <form onSubmit={handleSubmit} >
                    <div className='flex flex-col gap-4 ' >
                        <div className=' flex flex-col gap-3'>
                            <div className='my-4 p-2 rounded-lg bg-base_secondary bg-opacity-25' >
                                <h1 className='text-xl font-semibold text-center' >Add Your Store</h1>
                            </div>
                            <div className='flex mx-auto' >
                                <div className='xl:w-[25vw] flex flex-col gap-3'>
                                    <div>
                                        <div className='flex flex-col mx-4 items-start' >
                                            <InputLabel htmlFor="store_name" className=' font-medium ' >Store Name</InputLabel>
                                            <TextInput autoComplete='store_name' isFocused={true} type="text" onChange={(e) => setData("store_name", e.target.value)} placeholder="Type here" id='store_name' />
                                            <InputError message={errors.store_name} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className='flex flex-col mx-4 items-start' >
                                            <InputLabel htmlFor="store_description" className=' font-medium ' >Store Description</InputLabel>
                                            <TextArea autoComplete='store_description' onChange={(e) => setData("store_description", e.target.value)} placeholder="Type here" id='store_description' />
                                            <InputError message={errors.store_description} />
                                        </div>
                                    </div>
                                    <div className='flex flex-col mx-4 items-start' >
                                        <InputLabel htmlFor="store_banner" className=' font-medium ' >Store Banner</InputLabel>
                                        <input type="file" id='store_banner' onChange={handleStoreBanner} className="file-input file-input-bordered w-full max-w-xs" />
                                        <InputError message={errors.store_banner} />
                                    </div>
                                    {
                                        true ?
                                            <div className='w-[40vw]' >
                                                <img src={previewStoreBanner} alt="" />
                                            </div>
                                            : null
                                    }
                                    <div className='mb-5 flex justify-end gap-4'>
                                        <div >
                                            <PrimaryButton type='submit' disabled={processing} className='py-4 px-6 !bg-blue-400' >Add Store</PrimaryButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </WrapperShadow>
        </DashboardLayout>
    )
}

export default AddStore