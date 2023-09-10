import NavbarAdmin from '@/Components/Admin/NavbarAdmin';
import Sidebar from '@/Components/Sidebar';
import React, { PropsWithChildren, ReactNode, useState } from 'react'
import PaginateAdmin from '@/Components/Admin/PaginateAdmin';
import { PageProps, User } from '@/types';
import { usePage } from '@inertiajs/react';
import WrapperShadow from '@/Components/WrapperShadow';
import UploadDataMsg from '@/Components/Admin/UploadDataMsg';

type DashboardLayoutProps = {
    children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const user = usePage<PageProps>().props.auth.user;
    const [openSideBar, setOpenSideBar] = useState<boolean>(true)

    function handleOpenSideBar() {
        setOpenSideBar(!openSideBar)
    }
    return (
        <div className="min-h-screen lg:bg-gray-100 dark:bg-stone-900 dark:text-stone-100" >
            <div className='flex' >
                <Sidebar user={user} openSideBar={openSideBar} handleOpenSideBar={handleOpenSideBar} />
                <div className='max-w-[97vw] flex flex-1 flex-col justify-between ' >
                    <main className={` ${openSideBar ? 'w-[79vw]' : 'w-[96vw]'} duration-300 pb-4 min-h-screen mx-5`} >
                        <NavbarAdmin />
                        <UploadDataMsg />
                        {children}

                    </main>
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout