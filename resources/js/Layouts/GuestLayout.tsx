import ApplicationLogo from '@/Components/ApplicationLogo';
import NavbarMain from '@/Components/LandingPage/NavbarMain';
import TopBar from '@/Pages/LandingPage/Home/sections/TopBar';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="font-montserrat text-base_six ">
            <div className='fixed w-full top-0 z-[999999] bg-white' >
                <TopBar />
                <NavbarMain />
            </div>
            <div className='mt-[14vh]' >
                <div className='flex justify-center ' >
                    <div className='w-[90%] xl:w-[70%]' >
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
