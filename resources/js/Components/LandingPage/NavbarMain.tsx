import { PageProps } from '@/types'
import { Link, usePage } from '@inertiajs/react'
import { useState } from 'react'
import LinkMain from './LinkMain'
import TitleMain from './TitleMain'
import WrapperMxMain from './WrapperMxMain'

const NavbarMain = () => {
  const [openNavMobile, setOpenNavMobile] = useState<boolean>(false)
  const { auth } = usePage<PageProps>().props
  function handleNavMobile() {
    setOpenNavMobile(!openNavMobile);
  }

  return (
    <>
      <div className='h-16 border-b-[1px]' >
        <div className='flex items-center justify-center h-full' >
          {/* apa coba namanya */}
          <div className='flex items-center w-fit ' >
            <div className='text-2xl hidden xl:block font-montserrat font-semibold w-fit mx-4' >
              <h1 className='text-green-500'>Botiga De Roba</h1>
            </div>
            <div className='w-[40vw]' >
              <input type="text" className='w-full rounded-lg' />
            </div>
          </div>
          <div className='xl:hidden'>
            <button onClick={handleNavMobile} >Tutup</button>
          </div>
          <div className={`${openNavMobile ? 'block' : 'hidden'} xl:block`} >
            <div className='bg-white xl:bg-transparent xl:h-fit h-screen absolute left-0 top-0 xl:relative flex xl:items-center xl:flex-row flex-col w-full'>
              <div className='flex gap-5 xl:hidden border-b-2 h-12 items-center mx-4' >
                <button onClick={handleNavMobile} className='text-xl font-bold font-montserrat '>X</button>
                <TitleMain className='border-l-2 px-4'>Menu</TitleMain>
              </div>
              <div className='mx-4 flex flex-col xl:flex-row gap-10 xl:gap-4 h-fit ' >
                <div className='flex gap-1 items-center'>
                  <h1 className='text-sm'>Category</h1>
                  <img className='rotate-180' src='/icons/chevron_down.svg' />
                </div>
                <div className='flex gap-1 items-center'>
                  <h1 className='text-sm'>Product Virtual</h1>
                  <img className='rotate-180' src='/icons/chevron_down.svg' />
                </div>
              </div>
              <span className="h-[80%] rounded-lg w-[3px] bg-stone-200 mr-8 hidden xl:block">&nbsp;</span>
              <div className='flex gap-4 py-4'>
                {
                  auth.user ? <>
                    <div className='' >
                      <Link href={route('cart_product.index')} >
                        <img src="/icons/cart_shop.svg" alt="" />
                      </Link>
                    </div>
                  </>
                    : <>
                      <div>
                        <LinkMain href={route('login')} >
                          Log In
                        </LinkMain>
                      </div>
                      <div>
                        <LinkMain href={route('register')} variant='no_border'>
                          Sign Up
                        </LinkMain>
                      </div>
                    </>
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='border-b-2 ' >
        <WrapperMxMain  >
          <div className='mx-10 mx overflow-auto' >
            <div className='flex justify-start gap-6 text-sm py-2'>
              <Link className='whitespace-nowrap' href='' >Batik</Link>
              <Link className='whitespace-nowrap' href='' >Baby clothes</Link>
              <Link className='whitespace-nowrap' href='' >Bag</Link>
              <Link className='whitespace-nowrap' href='' >Camera</Link>
              <Link className='whitespace-nowrap' href='' >Sweeter</Link>
              <Link className='whitespace-nowrap' href='' >Vacuum Cleaner</Link>
            </div>
          </div>
        </WrapperMxMain>
      </div>
      {/* </div> */}
    </>
  )
}

export default NavbarMain