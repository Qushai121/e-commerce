import ButtonAdmin from '@/Components/Admin/ButtonAdmin'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import Modal from '@/Components/Modal'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import { Store } from '@/model/Store'
import { router, useForm } from '@inertiajs/react'
import React, { FormEvent, useState } from 'react'
import Swal from 'sweetalert2'

type EditStoreProps = {
    store: Store
}

const EditStore: React.FC<EditStoreProps> = ({ store }) => {

    const [openModal, setOpenModal] = useState<boolean>(false)

    function handleOpenModal() {
        setOpenModal(!openModal)
    }

    const { data, setData, put, errors, wasSuccessful, reset, processing, setDefaults } = useForm({
        store_name: store.store_name,
        store_description: store.store_description,
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
        router.post(route("store.update", store.id), {
            _method: "put",
            ...data as any,
        }, {
            onSuccess: (msg: any) => {
                setOpenModal(false);
                reset('store_description', 'store_banner', 'store_name');
                Swal.fire({
                    icon: 'success',
                    text: msg.props.flash.success,
                })
            },
            onError: (msg) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: msg.error,
                })
            }
        })
    }

    return (
        <>
            <ButtonAdmin className='bg-blue-400' onClick={handleOpenModal} >
                Edit
            </ButtonAdmin>
            <Modal show={openModal} onClose={handleOpenModal} maxWidth='4xl' >
                <form onSubmit={handleSubmit} >
                    <div className='flex flex-col gap-4 h-[90vh] overflow-auto' >
                        <div className=' flex flex-col gap-3'>
                            <div className='my-4 p-2 rounded-lg bg-base_secondary bg-opacity-25' >
                                <h1 className='text-xl font-semibold text-center' >Edit Your Store</h1>
                            </div>
                            <div className='flex mx-auto' >
                                <div className='xl:w-[25vw] flex flex-col gap-3'>
                                    <div>
                                        <div className='flex flex-col mx-4 items-start' >
                                            <InputLabel htmlFor="store_name" className=' font-medium ' >Store Name</InputLabel>
                                            <TextInput defaultValue={store.store_name} autoComplete='store_name' isFocused={true} type="text" onChange={(e) => setData("store_name", e.target.value)} placeholder="Type here" id='store_name' />
                                            <InputError message={errors.store_name} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className='flex flex-col mx-4 items-start' >
                                            <InputLabel htmlFor="store_description" className=' font-medium ' >Store Description</InputLabel>
                                            <textarea defaultValue={store.store_description} className='w-full' autoComplete='store_description' onChange={(e) => setData("store_description", e.target.value)} placeholder="Type here" id='store_description' />
                                            <InputError message={errors.store_description} />
                                        </div>
                                    </div>
                                    <div className='flex flex-col mx-4 items-start' >
                                        <InputLabel htmlFor="store_banner" className=' font-medium ' >Store Banner</InputLabel>
                                        <input type="file" id='store_banner' onChange={handleStoreBanner} className="file-input file-input-bordered w-full max-w-xs" />
                                        <InputError message={errors.store_banner} />
                                    </div>
                                    <div className='w-full flex justify-center' >

                                        {
                                            previewStoreBanner ?
                                                <div className='xl:w-[40vw]' >
                                                    <img src={previewStoreBanner} alt="" />
                                                </div>
                                                :
                                                <div className='xl:w-[40vw]' >
                                                    <img src={'/storage/' + store.store_banner} alt="" />
                                                </div>
                                        }
                                    </div>
                                    <div className='mb-5 mt-4 flex justify-end gap-4'>
                                        <div >
                                            <PrimaryButton type='submit' disabled={processing} className='py-4 px-6 !bg-blue-400' >Edit Store</PrimaryButton>
                                        </div>
                                        <div>
                                            <PrimaryButton type='button' onClick={handleOpenModal} className='bg-red-400 py-4 px-6' >Close</PrimaryButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default EditStore