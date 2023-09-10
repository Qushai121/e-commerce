import React, { useEffect, useState } from 'react'
import WrapperShadow from '../WrapperShadow'
import { usePage } from '@inertiajs/react'
import { PageProps } from '@/types'
import PrimaryButton from '../PrimaryButton'

const UploadDataMsg = () => {
    const flash = usePage<PageProps>().props.flash
    const { error, message, success } = flash;
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (error != null || message != null || success != null) {
            setOpen(true);
            setTimeout(() => {
                setOpen(false);
            }, 5000);
        }

        return () => {
            setOpen(false)
        }

    }, [flash]);


    function handleOpen() {
        setOpen(false);
    }

    return (
        <>
            <WrapperShadow className={`${open ? 'h-14' : 'h-[0px] !py-0 !mt-0'} duration-300 overflow-hidden`} >
                <div className='flex justify-between h-full' >
                    <div>
                        {success ?
                            <div className='text-success' >
                                {success}
                            </div>
                            : null
                        }
                        {error ?
                            <div className='text-error' >
                                {error}
                            </div>
                            : null
                        }
                        {message ?
                            <div className='text-info' >
                                {message}
                            </div>
                            : null
                        }
                    </div>
                    <div>
                        <button onClick={handleOpen} className='font-bold font-mono' >X</button>
                    </div>
                </div>
            </WrapperShadow>
        </>
    )
}

export default UploadDataMsg