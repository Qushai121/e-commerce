import WrapperShadow from '@/Components/WrapperShadow'
import DashboardLayout from '@/Layouts/DashboardLayout'
import DownloadMenu from '@/Components/Admin/DownloadMenu'
import Search from '@/Components/Admin/Search'
import LinkAdmin from '@/Components/Admin/LinkAdmin'
import React, { useState } from 'react'
import { Product } from '@/model/Product'
import { PageProps, PaginateResponse } from '@/types'
import { usePage } from '@inertiajs/react'
import MyStoreNow from '@/Components/Admin/MyStoreNow'
import Blocked from '../../../Components/blockedSection/Blocked'
import EditProduct from './EditProduct'
import BlockedChooseStore from '@/Components/blockedSection/BlockedChooseStore'
import PaginateAdmin from '@/Components/Admin/PaginateAdmin'
import PerPage from '@/Components/Admin/PerPage'

type IndexProductProps = {
  datas: PaginateResponse<Product>
  // datas: any
}

const IndexProduct: React.FC<IndexProductProps> = ({ datas }) => {
  const { mystores } = usePage<PageProps>().props
  const [haveStoreData] = useState<boolean>(mystores.stores.length > 0)
  // console.log(mystores.chosenStore);


  return (
    <DashboardLayout>
      <div className='flex xl:flex-row flex-col gap-4' >
        <WrapperShadow className='w-fit' >
          <div className='flex items-center h-full' >
            <LinkAdmin href={route('product.create')}>
              <p>Add Product</p>
            </LinkAdmin>
          </div>
        </WrapperShadow >
        <DownloadMenu className='w-fit' />
        <PerPage />
        <Search className='flex-1 flex justify-end py-2' />
      </div>
      <WrapperShadow className='min-h-[75vh] relative'>
        {
          datas.data.length ?

            <div className="overflow-x-auto ">
              <table className="table">
                {/* head */}
                <thead>
                  <tr >
                    <th>No</th>
                    <th>Product Name</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Release Date</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Store Id</th>
                  </tr>
                </thead>
                <tbody>
                  {datas.data.map((data, key) => (
                    <tr key={key}>
                      <th>{++key}</th>
                      <td>{data.product_name}</td>
                      <td>{data.description}</td>
                      <td>{data.category}</td>
                      <td>{data.image}</td>
                      <td>{data.price}</td>
                      <td>{data.discount}</td>
                      <td>{data.release_date?.toString()}</td>
                      <td>{data.created_at?.toString()}</td>
                      <td>{data.updated_at?.toString()}</td>
                      <td>{data.store_id}</td>
                      <td>
                        <div className='flex gap-4' >
                          <LinkAdmin href='' className='bg-green-400' >Detail</LinkAdmin>
                          <EditProduct product={data} />
                          <LinkAdmin href={route('product.destroy', Number(data.id))} as='button' method='delete' className='bg-red-400' >Delete</LinkAdmin>
                        </div>
                      </td>
                    </tr>
                  ))
                  }
                </tbody>
              </table>
            </div>
            :
            <>
              {
                haveStoreData ?
                  <>
                    {
                      mystores.chosenStore ?
                        <div className='flex justify-center items-center h-[75vh]' >
                          <div className='flex flex-col xl:flex-row  gap-2' >
                            <p className='text-2xl font-bold' >
                              You Dont Have Any Product On
                            </p>
                            <MyStoreNow className={'text-2xl font-bold text-center'} />
                          </div>
                        </div>
                        :
                        <BlockedChooseStore />
                    }
                  </>
                  :
                  <Blocked message='Make Your First Store' >
                    <LinkAdmin href={route('store.create')} className='animate-pulse' >{'Make Store'}</LinkAdmin>
                  </Blocked>
              }
            </>
        }
      </WrapperShadow>
      <PaginateAdmin data={datas} />
    </DashboardLayout>
  )
}

export default IndexProduct