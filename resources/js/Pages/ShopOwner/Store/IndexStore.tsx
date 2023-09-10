import BreadCrumbsAdmin from '@/Components/Admin/BreadCrumbsAdmin'
import ButtonAdmin from '@/Components/Admin/ButtonAdmin'
import DownloadMenu from '@/Components/Admin/DownloadMenu'
import LinkAdmin from '@/Components/Admin/LinkAdmin'
import NavbarAdmin from '@/Components/Admin/NavbarAdmin'
import PaginateAdmin from '@/Components/Admin/PaginateAdmin'
import PerPage from '@/Components/Admin/PerPage'
import Search from '@/Components/Admin/Search'
import WrapperShadow from '@/Components/WrapperShadow'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Store } from '@/model/Store'
import React from 'react'
import EditStore from './EditStore'
import { PaginateResponse } from '@/types'

type IndexStoreProps = {
    datas: PaginateResponse<Store>
}

const IndexStore: React.FC<IndexStoreProps> = ({ datas }) => {
    return (

        <DashboardLayout>
            <div className='flex flex-col xl:flex-row gap-4' >
                <WrapperShadow className='w-fit flex items-center' >
                    <LinkAdmin href={route('store.create')}  >
                        Add Store
                    </LinkAdmin>
                </WrapperShadow>
                {/* <WrapperShadow className='flex-1' >
                    <BreadCrumbsAdmin />
                </WrapperShadow> */}
                <DownloadMenu />
                <PerPage />
                <Search className='flex-1 justify-end ' />
            </div>
            <WrapperShadow className='min-h-[75vh]' >
                <div className="overflow-x-auto ">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr >
                                <th>No</th>
                                <th>Store Name</th>
                                <th>Store Description</th>
                                <th>Store Banner</th>
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
                                        <td>{data.store_name}</td>
                                        <td>{data.store_description}</td>
                                        <td>{data.store_banner}</td>
                                        <td>{data.updated_at?.toString()}</td>
                                        <td>{data.created_at?.toString()}</td>
                                        <td>
                                            <div className='flex gap-4' >
                                                <LinkAdmin href='' className='bg-green-400' >Detail</LinkAdmin>
                                                <EditStore store={data} />
                                                {/* <LinkAdmin href='' className='bg-blue-400' >Edit</LinkAdmin> */}
                                                <LinkAdmin href={route('store.destroy', Number(data.id))} as='button' method='delete' className='bg-red-400' >Delete</LinkAdmin>
                                            </div>
                                        </td>
                                    </tr>

                                ))
                            }

                        </tbody>
                    </table>
                </div>
            </WrapperShadow>
            <PaginateAdmin data={datas} />
        </DashboardLayout>

    )
}

export default IndexStore