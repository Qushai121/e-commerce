import DownloadMenu from '@/Components/Admin/DownloadMenu';
import LinkAdmin from '@/Components/Admin/LinkAdmin';
import PaginateAdmin from '@/Components/Admin/PaginateAdmin';
import PerPage from '@/Components/Admin/PerPage';
import Search from '@/Components/Admin/Search';
import WrapperShadow from '@/Components/WrapperShadow';
import BlockedChooseStore from '@/Components/blockedSection/BlockedChooseStore';
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Product } from '@/model/Product';
import { ProductTransactionWithStoreAndProduct } from '@/model/ProductTransaction';
import { PageProps, PaginateResponse } from '@/types';
import { usePage } from '@inertiajs/react';
import React from 'react'

type indexProductTransactionProps = {
    datas: PaginateResponse<ProductTransactionWithStoreAndProduct>
}
const indexProductTransaction: React.FC<indexProductTransactionProps> = ({ datas }) => {

    const { mystores } = usePage<PageProps>().props

    return (
        <DashboardLayout>
            <div className='flex xl:flex-row flex-col gap-4 ' >
                <DownloadMenu className='w-fit' />
                <PerPage />
                <Search className='flex-1 flex justify-end py-2' />
            </div>
            <WrapperShadow className='min-h-[75vh]'>
                {
                    !mystores.chosenStore ?
                        <div>
                            <BlockedChooseStore />
                        </div>
                        :
                        <div className="overflow-x-auto ">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr >
                                        <th>No</th>
                                        <th>Product Name</th>
                                        <th>Customer</th>
                                        <th>Total Price</th>
                                        <th>Status</th>
                                        <th>Updated At</th>
                                        <th>Created At</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        datas.data.map((data, key) => (
                                            <tr key={key}>
                                                <th>{++key}</th>
                                                <td>{data.product.product_name}</td>
                                                <td>{'asdasd'}</td>
                                                <td>$ {data.total_price}</td>
                                                <td>{data.status}</td>
                                                <td>{data.updated_at?.toString()}</td>
                                                <td>{data.created_at?.toString()}</td>
                                                <td>
                                                    <LinkAdmin href='' >Detail</LinkAdmin>
                                                </td>
                                            </tr>

                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>

                }
            </WrapperShadow>
            <PaginateAdmin data={datas} />
        </DashboardLayout>
    )
}

export default indexProductTransaction