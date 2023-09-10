import ButtonAdmin from '@/Components/Admin/ButtonAdmin'
import LinkAdmin from '@/Components/Admin/LinkAdmin'
import TextArea from '@/Components/Forms/TextArea'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import Modal from '@/Components/Modal'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import { Product } from '@/model/Product'
import { router, useForm } from '@inertiajs/react'
import React, { FormEvent, useState } from 'react'
import Swal from 'sweetalert2'
type EditProductProps = {
  product: Product
}
const EditProduct: React.FC<EditProductProps> = ({ product }) => {

  const [openModal, setOpenModal] = useState<boolean>(false)

  const { data, setData, patch, errors, wasSuccessful, reset, processing } = useForm({
    product_name: product.product_name,
    description: product.description,
    category: product.category,
    image: Blob,
    price: product.price,
    discount: product.discount,
    release_date: product.release_date,
    stock: product.stock,
  })

  const [previewImage, setPreviewImage] = useState<string>()

  function handleImage(params: React.ChangeEvent<HTMLInputElement>) {
    if (params.target.files && params.target.files[0]) {
      const data = URL.createObjectURL(params.target.files[0]);
      setPreviewImage(data);
      setData('image', params.target.files[0])
    }
  }

  function handleOpenModal() {
    setOpenModal(!openModal)
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.post(route("product.update", product.id), {
      _method: "put",
      ...data as any
    }, {
      onSuccess: () => {
        Swal.fire({
          icon: 'success',
          text: 'Your Store Succesfully Created',
          confirmButtonColor: "#3085d6",
        })
        setOpenModal(false);
        reset('image', 'category', 'description', 'discount', 'price', 'product_name', 'release_date');
      }
    })
  }


  return (
    <>
      <ButtonAdmin className='bg-blue-400' onClick={handleOpenModal} >
        Edit
      </ButtonAdmin>
      <Modal maxWidth='fit' show={openModal} onClose={handleOpenModal}  >
        <div className='max-w' >
          <form onSubmit={handleSubmit} >
            <div className='flex flex-col gap-4 ' >
              <div className=' flex flex-col gap-3'>
                <div className='my-4 p-2 rounded-lg bg-base_secondary bg-opacity-25' >
                  <h1 className='text-xl font-semibold text-center' >Edit Product</h1>
                </div>
                <div className='flex flex-col xl:flex-row mx-auto' >
                  <div className='xl:w-[25vw] flex flex-col gap-3'>
                    <div className='flex flex-col mx-4 items-start' >
                      <InputLabel htmlFor="product_name" className=' font-medium ' >Product Name</InputLabel>
                      <TextInput defaultValue={product.product_name} autoComplete='product_name' isFocused={true} type="text" onChange={(e) => setData("product_name", e.target.value)} placeholder="Type here" id='product_name' />
                      <InputError message={errors.product_name} />
                    </div>
                    <div className='flex flex-col mx-4 items-start' >
                      <InputLabel htmlFor="description" className=' font-medium ' >Description</InputLabel>
                      <TextArea defaultValue={product.description} className='h-48' autoComplete='description' onChange={(e) => setData("description", e.target.value)} placeholder="Type here" id='description' />
                      <InputError message={errors.description} />
                    </div>
                    <div className='flex flex-col mx-4 items-start' >
                      <InputLabel htmlFor="release_date" className=' font-medium ' >Release Date</InputLabel>
                      <TextInput defaultValue={product.release_date.toString()} type="date" onChange={(e) => setData("release_date", e.target.value)} placeholder="Type here" id='release_date' />
                      <InputError message={errors.release_date} />
                    </div>
                    <div className='flex flex-col mx-4 items-start' >
                      <InputLabel htmlFor="image" className=' font-medium ' >Image</InputLabel>
                      <input type="file" id='image' onChange={handleImage} className="file-input file-input-bordered w-full max-w-xs" />
                      <InputError message={errors.image} />
                    </div>
                    <div className='w-full mx-4 flex justify-center' >

                      {
                        previewImage ?
                          <div className='xl:w-[40vw]' >
                            <img src={previewImage} alt="" />
                          </div>
                          :
                          <div className='xl:w-[40vw]' >
                            <img src={'/storage/' + product.image} alt="" />
                          </div>
                      }
                    </div>

                  </div>
                  <div className='xl:w-[25vw] flex flex-col gap-3'>
                    <div className='flex flex-col mx-4 items-start' >
                      <InputLabel htmlFor="category" className=' font-medium ' >Category</InputLabel>
                      <TextArea defaultValue={product.category} className='h-48' autoComplete='category' onChange={(e) => setData("category", e.target.value)} placeholder="Type here" id='category' />
                      <InputError message={errors.category} />
                    </div>

                    <div className='flex flex-col mx-4 items-start' >
                      <InputLabel htmlFor="price" className=' font-medium ' >price</InputLabel>
                      <TextInput defaultValue={product.price} type="number" autoComplete='price' onChange={(e) => setData("price", e.target.valueAsNumber)} placeholder="Type here" id='price' />
                      <InputError message={errors.price} />
                    </div>

                    <div className='flex flex-col mx-4 items-start' >
                      <InputLabel htmlFor="stock" className=' font-medium ' >Stock</InputLabel>
                      <TextInput defaultValue={product.stock} type="number" autoComplete='stock' onChange={(e) => setData("stock", e.target.valueAsNumber)} placeholder="Type here" id='stock' />
                      <InputError message={errors.stock} />
                    </div>

                    <div className='flex flex-col mx-4 items-start' >
                      <InputLabel htmlFor="discount" className=' font-medium ' >Discount</InputLabel>
                      <TextInput defaultValue={product.discount} autoComplete='discount' type="number" onChange={(e) => setData("discount", e.target.valueAsNumber)} placeholder="Type here" id='discount' />
                      <InputError message={errors.discount} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='mx-4 mb-5 flex justify-end gap-4'>
                <div >
                  <PrimaryButton type='submit' disabled={processing} className='py-4 px-6 !bg-blue-400' >Edit Product</PrimaryButton>
                </div>
                <div>
                  <PrimaryButton type='button' onClick={handleOpenModal} className='bg-red-400 py-4 px-6' >Close</PrimaryButton>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  )
}

export default EditProduct