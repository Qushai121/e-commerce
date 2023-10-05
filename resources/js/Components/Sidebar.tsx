import React, { ChangeEventHandler, useEffect, useState } from 'react'
import Divider from './Divider'
import { Link, usePage } from '@inertiajs/react'
import { PageProps, User } from '@/types'
import MyStoreNow from './Admin/MyStoreNow'
import SelectStore from './Admin/SelectStore'

const SidebarLink = [
    {
        route: 'profile.edit',
        icon: '/icons/home.svg',
        name: 'Profile',
        role: ['all'],

    },
    {
        route: 'dashboard',
        icon: '/icons/dashboard.svg',
        name: 'Dashboard',
        role: ['shop_owner'],
    },
    {
        route: 'topup.index',
        icon: '/icons/topup.svg',
        name: 'Top Up',
        role: ['all'],
    },
    {
        route: 'store.index',
        icon: '/icons/store.svg',
        name: 'Store',
        role: ['shop_owner'],
        submenu: [
            {
                route: 'store.index',
                name: 'List Store',
            },
            {
                route: 'store.create',
                name: 'Add Store',
            },
        ],
    },
    {
        route: 'product.index',
        icon: '/icons/product.svg',
        name: 'Product',
        role: ['shop_owner'],
        submenu: [
            {
                route: 'product.index',
                name: 'List Product',
            },
            {
                route: 'product.create',
                name: 'Add Product',
            },
        ],
    },
    {
        route: 'shop_owner.product.transaction',
        icon: '/icons/transaction.svg',
        name: 'Product Transaction',
        role: ['shop_owner', 'store_3'],
        submenu: [
            {
                route: 'shop_owner.product.transaction',
                name: 'List Product Transaction',
            },
        ],
    },

]

type SidebarProps = {
    user: User
    openSideBar: boolean
    handleOpenSideBar: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ user, openSideBar, handleOpenSideBar }) => {
    const specialAccess = usePage<PageProps>().props.auth.roles.special_accesss;
    const [permissions, setpermissions] = useState([])

    function permissionss() {
        for (let i = 0; i < specialAccess.length; i++) {
            const element = specialAccess[i];
            setpermissions((prev) => [...prev, element.permission])
        }

    }


    useEffect(() => {
        permissionss()
    }, [])

    useEffect(() => {

        setOpenDropDown(' ')
        localStorage.setItem('DropdownAdmin', ' ')

        return () => {

        }
    }, [window.location.href])



    const [openDropDown, setOpenDropDown] = useState<string>(localStorage.getItem('DropdownAdmin') || ' ')

    function handleOpenDropDown(theRoute: string) {
        console.log(theRoute);

        if (theRoute == openDropDown) {
            setOpenDropDown(' ')
            localStorage.setItem('DropdownAdmin', ' ')
        } else {
            localStorage.setItem('DropdownAdmin', theRoute)
            setOpenDropDown(theRoute)
        }

    }


    return (
        <>
            <>
                <div className={`${openSideBar ? " w-[19rem]  " : "w-0 p-0"} duration-300 ease-in relative flex flex-col gap-6 px-2  `} >
                    <div className='sticky top-10'>
                        <div className={`${openSideBar ? 'flex opacity-100' : '-translate-x-48'} dark:bg-stone-600 shadow-lg ease-in overflow-auto flex-col rounded-xl h-[70vh] duration-300 `} >
                            <div className='flex flex-col gap-3 relative' >
                                <div className='mt-1' >
                                    <h1 className='text-2xl font-bold text-center my-2 font-serif' >Botiga De Roba</h1>
                                </div>
                                <Divider />
                            </div>
                            <div className='flex h-full' >
                                <div className='flex flex-1 flex-col items-start my-2 gap-2 mx-4' >
                                    {
                                        SidebarLink.filter(item => {
                                            if (item.role[0] === 'all') {
                                                return true
                                            }
                                            return item.role.some(role => permissions.includes(role));
                                        }).map((data, key) => (
                                            <div key={key} className={` w-full flex flex-col duration-300 relative`}>
                                                {!data.submenu ?
                                                    <Link href={route(data.route)} >
                                                        <div className={`${route().current(data.route) ? 'bg-gradient-to-r from-gray-50 to-stone-300' : 'bg-stone-50'} duration-300 rounded-xl  w-full h-12 flex justify-start items-center`} >
                                                            <div className='h-8 rounded-lg w-8 shadow-base_secondary shadow-md m-2 object-cover' >
                                                                <img src={data.icon} alt="" className='h-full p-2' />
                                                            </div>
                                                            <p className='text-sm font-light w-[40%] whitespace-nowrap flex flex-wrap' >{data.name}</p>
                                                        </div>
                                                    </Link>
                                                    : <div className='w-full '>
                                                        <div onClick={() => handleOpenDropDown(data.route)} className={`${route().current()?.split('.')[0] == data.route.split('.')[0] ? 'bg-gradient-to-r from-gray-50 to-stone-300' : 'bg-stone-50'} duration-300 rounded-xl  w-full h-12 flex items-center`} >
                                                            <div className='w-full flex items-center' >
                                                                <div className='h-8 rounded-lg w-8 shadow-base_secondary shadow-md m-2 object-cover' >
                                                                    <img src={data.icon} alt="" className='h-full p-2' />
                                                                </div>
                                                                <p className='text-sm font-light w-[40%] whitespace-nowrap flex flex-wrap' >{data.name}</p>
                                                            </div>
                                                            <div className='h-8 rounded-lg w-8 bg-stone-50 shadow-base_secondary shadow-md m-2 object-cover' >
                                                                <img src="/icons/chevron_down.svg" alt="" className={`${openDropDown == data.route ? 'rotate-180' : 'rotate-0'} h-full p-2 ease-in duration-300 `} />
                                                            </div>
                                                        </div>
                                                        <>
                                                            <div className={`${openDropDown == data.route ? 'mt-2 h-full' : 'h-[0px] mt-0 '}  flex w-full duration-300 mt-2 `}>

                                                                <div className='w-full flex flex-col ' >
                                                                    <div className='w-full flex flex-col gap-2 overflow-hidden border-l-4 ' >
                                                                        {
                                                                            data.submenu.map((submenu, key) => (
                                                                                <div key={key} className='flex items-center  duration-300' >
                                                                                    <p className='border-2 w-2' ></p>
                                                                                    <div className='w-full' >
                                                                                        <Link key={key} href={route(submenu.route)} className='w-full  rounded-lg' >
                                                                                            <div className={`${route().current(submenu.route) ? 'bg-gradient-to-r from-gray-50 to-stone-300' : 'bg-stone-50'} duration-300 rounded-xl  w-full h-12 flex justify-start items-center`} >
                                                                                                <p className='text-sm font-light mx-2' >{submenu.name}</p>
                                                                                            </div>
                                                                                        </Link>
                                                                                    </div>
                                                                                </div>
                                                                            ))
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    </div>
                                                }
                                            </div>
                                        ))
                                    }
                                </div>

                            </div>
                        </div>
                        <div className={`${openSideBar ? 'translate-x-0' : '-translate-x-52'} duration-300 shadow-rounded-2 py-4 h-[25%] p-2 rounded-xl`} >
                            <div>
                                <div className='flex gap-3' >
                                    <div className='flex items-center' >
                                        <div className="avatar">
                                            <div className="w-12 rounded-full">
                                                <img src="/assets/avatar.png" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='max-w-full overflow-hidden' >
                                        <h1>{user.name}</h1>
                                        <h1>Authority : {'Owner Shop'}</h1>
                                        <div className='flex gap-2' >
                                            <p>My Store :</p>
                                            <MyStoreNow />
                                        </div>
                                    </div>
                                </div>
                                <Link href={route('logout')} method='post' as="button" >Log Out</Link>
                                <div>
                                    <p>Go to Other Store :</p>
                                    {/* muncul error di console pahadal dah bener  */}
                                    <SelectStore />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${openSideBar ? 'mx-2' : '-ml-3'} min-h-screen max-h-full flex relative`} >
                    <button onClick={() => handleOpenSideBar()} className='bg-stone-300 w-6 h-[90%] top-0 sticky hover:bg-stone-400 duration-300 ease-in transition-all rounded-full flex items-center justify-center' >
                        {/* <p>{">"}</p> */}
                        <p>{"<"}</p>
                    </button>
                </div>
            </>
        </>
    )
}

export default Sidebar
