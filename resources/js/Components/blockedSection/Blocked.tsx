import LinkAdmin from '@/Components/Admin/LinkAdmin'
import React, { ReactNode } from 'react'

type BlockedProps = {
    message: string,
    children: ReactNode
}

const Blocked: React.FC<BlockedProps> = ({ message, children }) => {
    // bisa di ilangin pake inspect
    return (
        <div className='h-full w-[98%] backdrop-blur-sm bg-stone-300 bg-opacity-30 absolute' >
            <div className='flex h-full flex-col items-center justify-center gap-5 w-full' >
                <p className='text-xl xl:text-3xl font-bold' >{message}</p>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Blocked