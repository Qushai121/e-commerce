import { Link } from '@inertiajs/react'
import React from 'react'
import WrapperMxMain from './WrapperMxMain'

const NavbarMain = () => {
  return (
    <>
      <div className='h-16 border-b-[1px]' >
        <div className='flex items-center justify-center h-full' >
          {/* apa coba namanya */}
          <div className='text-2xl  font-montserrat font-semibold w-fit mx-4' >
            <h1 className='text-green-500'>Botiga De Roba</h1>
          </div>
          <div className='w-[50%]' >
            <input type="text" className='w-full rounded-lg' />
          </div>
          <div className='mx-4 flex gap-4' >
            <div className='flex gap-1'>
              <h1 className='text-sm'>Category</h1>
              <img className='rotate-180' src='/icons/chevron_down.svg' />
            </div>
            <div className='flex gap-1'>
              <h1 className='text-sm'>Product Virtual</h1>
              <img className='rotate-180' src='/icons/chevron_down.svg' />
            </div>
          </div>
          <span className="h-[80%] rounded-lg w-[3px] bg-stone-200 mr-8">&nbsp;</span>
          <div className='flex gap-4'>
            <div>
                <Link href='' className='border-2 border-green-600 py-2 px-4 rounded-lg text-green-600 font-semibold' >Login</Link>
            </div>
            <div>
                <Link href='' className='bg-green-600 border-2 border-green-600  py-2 px-4 rounded-lg text-stone-50 font-semibold' >Sign Up</Link>
            </div>
          </div>
        </div>
        <div>
        </div>
      </div>

      <div className='border-b-2' >
        <WrapperMxMain>
          <div className='flex gap-6 text-sm py-1 '>
            <Link href='' >Batik</Link>
            <Link href='' >Baby clothes</Link>
            <Link href='' >Bag</Link>
            <Link href='' >Camera</Link>
            <Link href='' >Sweeter</Link>
            <Link href='' >Vacuum Cleaner</Link>
          </div>
        </WrapperMxMain>
      </div>
    </>
  )
}

export default NavbarMain